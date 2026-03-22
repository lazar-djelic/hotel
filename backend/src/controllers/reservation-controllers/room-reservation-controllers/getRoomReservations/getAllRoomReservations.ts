import RoomReservation from "../../../../models/RoomReservation.ts";
import { type Response, type NextFunction } from "express";
import { roomReservationArraySchema } from "../../../../schemas/roomReservation.response.schema.ts";
import type { GetRoomReservationsRequest } from "./types.ts";

export async function getAllRoomReservations(
  _req: GetRoomReservationsRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const startD = new Date(_req.query.startDate);
    startD.setUTCHours(0, 0, 0, 0);
    const endD = new Date(_req.query.endDate);
    endD.setUTCHours(23, 59, 59, 999);

    const reservations = await RoomReservation.find({
      startDate: { $lte: endD },
      endDate: { $gte: startD },
    })
      .populate("guest")
      .populate("assignedRoom")
      .sort({ createdAt: -1 })
      .lean();

    const parsed = roomReservationArraySchema.safeParse(reservations);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error in getAllRoomReservations controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
