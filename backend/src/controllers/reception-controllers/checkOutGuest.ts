import { type Response } from "express";
import type { checkOutRequest } from "./types.ts";
import mongoose from "mongoose";
import { Stay } from "../../models/Stay.ts";
import Room from "../../models/Room.ts";
import {
  STAY_STATUS,
  ROOM_STATUS,
  HOUSEKEEPING_OPTIONS,
} from "../../utils/enums.ts";

export async function checkOutGuest(req: checkOutRequest, res: Response) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const stay = await Stay.findById(req.params.id).session(session);

    if (!stay) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Stay not found" });
    }

    const room = await Room.findById(stay.room.toString()).session(session);

    if (!room) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Room not found" });
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);

    await Stay.findByIdAndUpdate(
      req.params.id,
      {
        stStatus: STAY_STATUS.checked_out,
        checkOut: today,
      },
      { session },
    );

    await Room.findByIdAndUpdate(
      stay.room,
      {
        status: ROOM_STATUS.available,
        housekeeping: HOUSEKEEPING_OPTIONS.dirty,
        currentStay: null,
      },
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Stay checked out successfully" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in checkOut controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
