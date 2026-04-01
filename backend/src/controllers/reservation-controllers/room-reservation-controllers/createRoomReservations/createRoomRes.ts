import { type Response, type NextFunction } from "express";
import type { CreateRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { roomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";
import mongoose from "mongoose";
import Room from "../../../../models/Room.ts";
import {
  RESERVATION_STATUS,
  ROOM_STATUS,
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

    const query = {
      type: req.body.roomType,
      bednum: req.body.bedNum,
      status: ROOM_STATUS.available,
      ...(req.body.smoking !== undefined && { smoking: req.body.smoking }),
      ...(req.body.accessibility !== undefined && {
        accessibility: req.body.accessibility,
      }),
      ...(req.body.view !== undefined && { view: req.body.view }),
      ...(req.body.balcony !== undefined && { balcony: req.body.balcony }),
      ...(req.body.pets !== undefined && { pets: req.body.pets }),
    };

    const availableRoom = await Room.findOne(query).session(session);

    if (!availableRoom) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({
        message: "No available room matching the requested criteria.",
      });
    }

    const conflict = await RoomReservation.findOne({
      assignedRoom: availableRoom._id,
      startDate: { $lt: endD },
      endDate: { $gt: startD },
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
