import { type Response, type NextFunction } from "express";
import type { CreateRoomReservationReceptionRequest } from "./types.ts";
import Guest from "../../../../models/Guest.ts";
import { guestSimpleSchema } from "../../../../schemas/guest.response.schema.ts";
import {
  roomReservationReceptionSimpleSchema,
  roomReservationSimpleSchema,
} from "../../../../schemas/roomReservation.response.schema.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import mongoose from "mongoose";
import Room from "../../../../models/Room.ts";
import { Stay } from "../../../../models/Stay.ts";
import {
  RESERVATION_STATUS,
  ROOM_STATUS,
  STAY_STATUS,
} from "../../../../utils/enums.ts";

export async function createGuestAndRoomRes(
  req: CreateRoomReservationReceptionRequest,
  res: Response,
  next: NextFunction,
) {
  const parsed = roomReservationReceptionSimpleSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsed.error.issues });
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const guest = new Guest({
      fName: req.body.fName,
      lName: req.body.lName,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      personalID: req.body.personalID,
      birthDate: req.body.birthDate,
      notes: req.body.notes,
    });
    const newGuest = await guest.save({ session });

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
      checkIn: { $lt: new Date(req.body.endDate) },
      $or: [
        { checkOut: null },
        { checkOut: { $gt: new Date(req.body.startDate) } },
      ],
    }).session(session);

    if (stayConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room reservation conflicts with an existing stay.",
      });
    }

    const reservation = new RoomReservation({
      guest: newGuest._id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      adults: req.body.adults,
      children: req.body.children,
      assignedRoom: availableRoom._id,
      resStatus: RESERVATION_STATUS.booked,
      rate: availableRoom.rate,
      currency: availableRoom.currency,
    });

    const savedReservation = await reservation.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(savedReservation);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in createRoomReservationReception controller", error);
    res.status(500).json({
      message:
        "Internal server error. There is a conflict with creating a reservation.",
    });
  }
}
