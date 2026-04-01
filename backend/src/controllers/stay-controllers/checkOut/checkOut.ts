import type { Response, NextFunction } from "express";
import type { CheckOutRequest } from "./types.ts";
import mongoose from "mongoose";
import Room from "../../../models/Room.ts";
import { Stay } from "../../../models/Stay.ts";
import {
  STAY_STATUS,
  ROOM_STATUS,
  HOUSEKEEPING_OPTIONS,
} from "../../../utils/enums.ts";

export async function checkOut(
  req: CheckOutRequest,
  res: Response,
  next: NextFunction,
) {
  const session = await mongoose.startSession();

  try {
    if (!req.params.id) {
      return res.status(400).json({ message: "No id provided." });
    }

    session.startTransaction();

    const stay = await Stay.findById(req.params.id).session(session);
    if (!stay) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Stay not found." });
    }

    stay.checkOut = new Date();
    stay.stStatus = STAY_STATUS.checked_out;

    if (req.body?.notes) {
      stay.notes = req.body.notes;
    }

    const room = await Room.findById(stay.room).session(session);
    if (!room) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Room not found." });
    }

    room.status = ROOM_STATUS.available;
    room.housekeeping = HOUSEKEEPING_OPTIONS.dirty;
    room.currentStay = null;

    await stay.save({ session });
    await room.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Check-out completed successfully." });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in checkOut controller", error);
    res.status(500).json({
      message: "Internal server error. There is a conflict with checkOut.",
    });
  }
}
