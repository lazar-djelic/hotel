import { type Response, type NextFunction } from "express";
import type { CreateStayRequest } from "./types.ts";
import { Stay } from "../../../models/Stay.ts";
import { staySimpleSchema } from "../../../schemas/stay.response.schema.ts";
import mongoose from "mongoose";
import {
  STAY_STATUS,
  ROOM_STATUS,
  RESERVATION_STATUS,
  HOUSEKEEPING_OPTIONS,
} from "../../../utils/enums.ts";
import RoomReservation from "../../../models/RoomReservation.ts";
import Room from "../../../models/Room.ts";

export async function createStay(
  req: CreateStayRequest,
  res: Response,
  next: NextFunction,
) {
  const session = await mongoose.startSession();

  try {
    const parsed = staySimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const stay = new Stay({
      guest: req.body.guest,
      reservation: req.body.reservation,
      room: req.body.room,
      checkIn: req.body.checkIn,
      checkOut: req.body.checkOut,
      stStatus: STAY_STATUS.checked_in,
      adults: req.body.adults,
      children: req.body.children,
      rate: req.body.rate,
      currency: req.body.currency,
      extras: req.body.extras,
      notes: req.body.notes,
    });

    session.startTransaction();

    const room = await Room.findById(parsed.data.room).session(session);

    if (!room) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Room not found",
      });
    }

    if (
      room.status !== ROOM_STATUS.available ||
      room.housekeeping !== HOUSEKEEPING_OPTIONS.clean
    ) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room is not available or has not been cleaned",
      });
    }

    const stayConflict = await Stay.findOne({
      room: parsed.data.room,
      stStatus: STAY_STATUS.checked_in,
      checkIn: { $lt: parsed.data.checkOut },
      $or: [{ checkOut: { $gt: parsed.data.checkIn } }, { checkOut: null }],
    }).session(session);

    if (stayConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room is no longer available",
      });
    }

    const reservationConflict = await RoomReservation.findOne({
      assignedRoom: parsed.data.room,
      startDate: { $lt: parsed.data.checkOut },
      endDate: { $gt: parsed.data.checkIn },
    }).session(session);

    if (reservationConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room has conflicting reservation dates",
      });
    }

    await Room.findByIdAndUpdate(
      parsed.data.room,
      { status: ROOM_STATUS.occupied },
      { session },
    );

    if (parsed.data.reservation) {
      await RoomReservation.findByIdAndUpdate(
        parsed.data.reservation,
        { resStatus: RESERVATION_STATUS.checked_in },
        { session },
      );
    }

    const savedStay = await stay.save({ session });

    await Room.findByIdAndUpdate(
      parsed.data.room,
      { currentStay: savedStay._id },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(savedStay);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in createStay controller", error);
    res.status(500).json({
      message:
        "Internal server error. There is a conflict with creating a stay.",
    });
  }
}
