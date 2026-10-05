import { type Response } from "express";
import type { DeleteStayRequest } from "./types.ts";
import { Stay } from "../../../models/Stay.ts";
import Room from "../../../models/Room.ts";
import mongoose from "mongoose";

export async function deleteStay(req: DeleteStayRequest, res: Response) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const stay = await Stay.findById(req.params.id).session(session);

    if (!stay) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Stay not found" });
    }

    await Room.findByIdAndUpdate(stay.room, { currentStay: null }, { session });

    const deletedStay = await Stay.findByIdAndDelete(req.params.id, {
      session,
    });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Stay deleted successfuly" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in deleteStay controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
