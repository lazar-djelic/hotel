import { type Response } from "express";
import type { DeleteRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import Room from "../../../../models/Room.ts";
import { ROOM_STATUS } from "../../../../utils/enums.ts";
import mongoose from "mongoose";

export async function deleteRoomReservation(
  req: DeleteRoomReservationRequest,
  res: Response,
) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const reservation = await RoomReservation.findById(req.params.id).session(
      session,
    );

    if (!reservation) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Room reservation not found" });
    }

    if (reservation.assignedRoom) {
      const room = await Room.findById(reservation.assignedRoom).session(
        session,
      );

      if (room && room.status === ROOM_STATUS.reserved) {
        await Room.findByIdAndUpdate(
          reservation.assignedRoom,
          { status: ROOM_STATUS.available },
          { session },
        );
      }
    }

    const deletedReservation = await RoomReservation.findByIdAndDelete(
      req.params.id,
      { session },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: "Room reservation deleted successfuly" });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in deleteRoomReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
