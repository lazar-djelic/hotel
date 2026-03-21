import { type Response, type NextFunction } from "express";
import type { UpdateRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { updateRoomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";
import {
  USER_ROLE,
  ROOM_STATUS,
  STAY_STATUS,
} from "../../../../utils/enums.ts";
import Room from "../../../../models/Room.ts";
import { Stay } from "../../../../models/Stay.ts";
import mongoose from "mongoose";

export async function updateRoomReservation(
  req: UpdateRoomReservationRequest,
  res: Response,
  next: NextFunction,
) {
  const session = await mongoose.startSession();

  try {
    if (
      req.session.role === USER_ROLE.guest &&
      req.body.guest !== req.session.guest
    )
      return res
        .status(401)
        .json({ message: "Unauthorized. Guests do not match." });

    session.startTransaction();

    const parsed = updateRoomReservationSimpleSchema.parse(req.body);

    const currentReservation = await RoomReservation.findById(
      req.params.id,
    ).session(session);

    if (!currentReservation) {
      await session.abortTransaction();
      session.endSession();
      return res.status(404).json({ message: "Room reservation not found" });
    }

    const dateConflict = await RoomReservation.findOne({
      _id: { $ne: req.params.id },
      assignedRoom: req.body.assignedRoom,
      startDate: { $lt: req.body.endDate },
      endDate: { $gt: req.body.startDate },
    }).session(session);

    if (dateConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Updated dates conflict with another reservation.",
      });
    }

    const stayConflict = await Stay.findOne({
      room: req.body.assignedRoom,
      stStatus: STAY_STATUS.checked_in,
      checkIn: { $lt: req.body.endDate },
      $or: [{ checkOut: { $gt: req.body.startDate } }, { checkOut: null }],
    }).session(session);

    if (stayConflict) {
      await session.abortTransaction();
      session.endSession();
      return res.status(409).json({
        message: "Updated dates conflict with an active stay.",
      });
    }

    if (
      req.body.assignedRoom &&
      req.body.assignedRoom !== currentReservation.assignedRoom?.toString()
    ) {
      const newRoom = await Room.findById(req.body.assignedRoom).session(
        session,
      );

      if (!newRoom) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          message: "Requested room not found.",
        });
      }

      if (newRoom.status !== ROOM_STATUS.available) {
        await session.abortTransaction();
        session.endSession();
        return res.status(409).json({
          message: "New room is not available.",
        });
      }

      await Room.findByIdAndUpdate(
        currentReservation.assignedRoom,
        { status: ROOM_STATUS.available },
        { session },
      );

      await Room.findByIdAndUpdate(
        req.body.assignedRoom,
        { status: ROOM_STATUS.reserved },
        { session },
      );
    }

    const updatedReservation = await RoomReservation.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      {
        guest: req.body.guest,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        adults: req.body.adults,
        children: req.body.children,
        assignedRoom: req.body.assignedRoom,
        resStatus: req.body.resStatus,
      },
      {
        new: true,
        session,
      },
    );

    await session.commitTransaction();
    session.endSession();

    res.status(200).json(updatedReservation);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error("Error in updateRoomReservation controller", error);
    res.status(500).json({
      message:
        "Internal server error. There is a conflict with updating the reservation.",
    });
  }
}
