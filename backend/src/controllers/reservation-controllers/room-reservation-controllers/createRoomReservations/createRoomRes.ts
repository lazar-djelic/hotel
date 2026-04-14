import { type Response, type NextFunction } from "express";
import type { CreateRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { roomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";
import mongoose from "mongoose";
import Room from "../../../../models/Room.ts";
import { Stay } from "../../../../models/Stay.ts";
import {
  RESERVATION_STATUS,
  ROOM_STATUS,
  STAY_STATUS,
  USER_ROLE,
} from "../../../../utils/enums.ts";

export async function createRoomRes(
  req: CreateRoomReservationRequest,
  res: Response,
  next: NextFunction,
) {
  if (req.session.role === USER_ROLE.guest && !req.session.guest) {
    return res.status(400).json({
      message: "Cannot create reservation without personal information.",
    });
  }

  const parsed = roomReservationSimpleSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsed.error.issues });
  }

  if (
    req.session.role === USER_ROLE.guest &&
    req.body.guest !== req.session.guest
  )
    return res
      .status(401)
      .json({ message: "Unauthorized. Guests do not match." });

  const startD = new Date(req.body.startDate);
  startD.setUTCHours(0, 0, 0, 0);
  const endD = new Date(req.body.endDate);
  endD.setUTCHours(23, 59, 59, 999);

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const availableRoom = await Room.findOne({
      _id: req.body.assignedRoom._id,
      status: { $ne: ROOM_STATUS.outofservice },
    }).session(session);

    if (!availableRoom) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "Room not found or is not available.",
      });
    }

    const reservationConflict = await RoomReservation.findOne({
      assignedRoom: availableRoom._id,
      resStatus: { $ne: RESERVATION_STATUS.cancelled },
      startDate: { $lt: req.body.endDate },
      endDate: { $gt: req.body.startDate },
    }).session(session);

    if (reservationConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room reservation conflicts with an existing reservation.",
      });
    }

    const stayConflict = await Stay.findOne({
      room: availableRoom._id,
      stStatus: STAY_STATUS.checked_in,
      checkIn: { $lt: endD },
      $or: [{ checkOut: null }, { checkOut: { $gt: startD } }],
    }).session(session);

    if (stayConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room reservation conflicts with an existing stay.",
      });
    }

    const reservation = new RoomReservation({
      guest: req.body.guest,
      startDate: startD,
      endDate: endD,
      adults: req.body.adults,
      children: req.body.children,
      assignedRoom: availableRoom._id,
      resStatus: RESERVATION_STATUS.booked,
    });

    const savedReservation = await reservation.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(savedReservation);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in createRoomReservation controller", error);
    res.status(500).json({
      message:
        "Internal server error. There is a conflict with creating a reservation.",
    });
  }
}
