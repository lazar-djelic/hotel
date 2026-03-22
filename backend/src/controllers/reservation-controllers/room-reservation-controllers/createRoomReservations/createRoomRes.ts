import { type Response, type NextFunction } from "express";
import type { CreateRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { roomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";
import mongoose from "mongoose";
import Room from "../../../../models/Room.ts";
import { RESERVATION_STATUS, ROOM_STATUS } from "../../../../utils/enums.ts";

export async function createRoomRes(
  req: CreateRoomReservationRequest,
  res: Response,
  next: NextFunction,
) {
  const parsed = roomReservationSimpleSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsed.error.issues });
  }

  if (req.body.guest !== req.session.guest)
    return res
      .status(401)
      .json({ message: "Unauthorized. Guests do not match." });

  const session = await mongoose.startSession();

  try {
    session.startTransaction();

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
      guest: req.body.guest,
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
    console.error("Error in createRoomReservation controller", error);
    res.status(500).json({
      message:
        "Internal server error. There is a conflict with creating a reservation.",
    });
  }
}
