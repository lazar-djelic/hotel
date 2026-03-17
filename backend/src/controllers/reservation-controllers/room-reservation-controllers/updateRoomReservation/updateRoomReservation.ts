import { type Response, type NextFunction } from "express";
import type { UpdateRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { roomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";

export async function updateRoomReservation(
  req: UpdateRoomReservationRequest,
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

    const updatedReservation = await RoomReservation.findOneAndUpdate(
      {
        _id: req.params.id,
        guest: req.session.guest,
      },
      {
        guest,
        startDate,
        endDate,
        roomType,
        bedNum,
      },
      {
        new: true,
      },
    );

    if (!updatedReservation)
      return res.status(404).json({ message: "Room reservation not found" });

    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error("Error in updateRoomReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
