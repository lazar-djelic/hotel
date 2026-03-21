import { type Response, type NextFunction } from "express";
import type { UpdateStayRequest } from "./types.ts";
import { Stay } from "../../../models/Stay.ts";
import { staySimpleSchema } from "../../../schemas/stay.response.schema.ts";
import mongoose from "mongoose";
import { STAY_STATUS } from "../../../utils/enums.ts";
import RoomReservation from "../../../models/RoomReservation.ts";

export async function updateStay(
  req: UpdateStayRequest,
  res: Response,
  next: NextFunction,
) {
  const session = await mongoose.startSession();

  try {
    const {
      guest,
      reservation,
      room,
      checkIn,
      checkOut,
      stStatus,
      adults,
      children,
      rate,
      currency,
      extras,
      notes,
    } = req.body;

    const parsed = staySimpleSchema.parse(req.body);

    session.startTransaction();

    const currentStay = await Stay.findById(req.params.id).session(session);

    if (!currentStay) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Stay not found" });
    }

    const stayConflict = await Stay.findOne({
      _id: { $ne: req.params.id },
      room: parsed.room,
      stStatus: STAY_STATUS.checked_in,
      checkIn: { $lt: parsed.checkOut },
      $or: [{ checkOut: { $gt: parsed.checkIn } }, { checkOut: null }],
    }).session(session);

    if (stayConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room is no longer available due to conflicting stay",
      });
    }

    const reservationConflict = await RoomReservation.findOne({
      assignedRoom: parsed.room,
      startDate: { $lt: parsed.checkOut },
      endDate: { $gt: parsed.checkIn },
    }).session(session);

    if (reservationConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room has conflicting reservation dates",
      });
    }

    const updatedStay = await Stay.findByIdAndUpdate(
      req.params.id,
      {
        guest,
        reservation,
        room,
        checkIn,
        checkOut,
        stStatus,
        adults,
        children,
        rate,
        currency,
        extras,
        notes,
      },
      {
        new: true,
        session,
      },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedStay);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in updateStay controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
