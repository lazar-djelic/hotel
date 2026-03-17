import { type Response, type NextFunction } from "express";
import type { CreateRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { roomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";

export async function createRoomReservation(
  req: CreateRoomReservationRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { guest, startDate, endDate, roomType, bedNum } = req.body;

    if (guest !== req.session.guest)
      return res
        .status(401)
        .json({ message: "Unauthorized. Guests do not match." });

    const reservation = new RoomReservation({
      guest,
      startDate,
      endDate,
      roomType,
      bedNum,
    });
    const parsed = roomReservationSimpleSchema.parse(reservation);
    await reservation.save();
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in createRoomReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
