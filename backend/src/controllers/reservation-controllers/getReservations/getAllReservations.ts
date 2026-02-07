import Reservation from "../../../models/Reservation.ts";
import { type Response, type NextFunction } from "express";
import { reservationArraySchema } from "../../../schemas/reservation.response.schema.ts";
import type { GetReservationsRequest } from "./types.ts";

export async function getAllReservations(
  _req: GetReservationsRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const startD = new Date(_req.query.startDate);
    startD.setUTCHours(0, 0, 0, 0);
    const endD = new Date(_req.query.endDate);
    endD.setUTCHours(23, 59, 59, 999);

    const reservations = await Reservation.find({
      startDate: { $lte: endD },
      endDate: { $gte: startD },
    })
      .sort({ createdAt: -1 })
      .lean();

    const parsed = reservationArraySchema.parse(reservations);
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error in getAllReservations controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
