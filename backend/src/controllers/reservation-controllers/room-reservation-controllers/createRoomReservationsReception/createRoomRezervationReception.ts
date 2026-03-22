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
import { RESERVATION_STATUS, ROOM_STATUS } from "../../../../utils/enums.ts";

export async function createRoomReservationReception(
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
      type: req.body.roomType,
      bednum: req.body.bedNum,
      smoking: req.body.smoking,
      accessibility: req.body.accessibility,
      view: req.body.view,
      balcony: req.body.balcony,
      pets: req.body.pets,
      linkedroom: req.body.linkedRoom,
      status: ROOM_STATUS.available,
    }).session(session);

    if (!availableRoom) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "No available room matching the requested criteria.",
      });
    }

    const conflict = await RoomReservation.findOne({
      assignedRoom: availableRoom._id,
      startDate: { $lt: req.body.endDate },
      endDate: { $gt: req.body.startDate },
    }).session(session);

    if (conflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Room reservation conflicts with an existing reservation.",
      });
    }

    await Room.findByIdAndUpdate(
      availableRoom._id,
      { status: ROOM_STATUS.reserved },
      { session },
    );

    const reservation = new RoomReservation({
      guest: newGuest._id,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
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
    console.error("Error in createRoomReservationReception controller", error);
    res.status(500).json({
      message:
        "Internal server error. There is a conflict with creating a reservation.",
    });
  }
}
