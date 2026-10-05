import { type Response, type NextFunction } from "express";
import type { GetRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { roomReservationSchema } from "../../../../schemas/roomReservation.response.schema.ts";
import { USER_ROLE } from "../../../../utils/enums.ts";

export async function getRoomReservationById(
  req: GetRoomReservationRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const filter: any = { _id: req.params.id };

    if (req.session.role === USER_ROLE.guest) {
      filter.guest = req.session.guest;
    }

    const reservation = await RoomReservation.findOne(filter)
      .populate("guest")
      .populate("assignedRoom");

    if (!reservation)
      return res.status(404).json({ message: "Room reservation not found" });

    const parsed = roomReservationSchema.safeParse(reservation);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getRoomReservationById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
