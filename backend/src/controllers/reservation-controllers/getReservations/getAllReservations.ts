import Reservation from "../../../models/Reservation.ts";
import { type Response, type NextFunction } from "express";
import { reservationArraySchema } from "../../../schemas/reservation.response.schema.ts";
import type { GetReservationsRequest } from "./types.ts";

export async function getAllReservations(
  _req: GetReservationsRequest,
  res: Response,
  next: NextFunction
) {
  try {
    // all
    // const reservations = await Reservation.find()
    //   .sort({ createdAt: -1 })
    //   .lean();

    const startDate = new Date(_req.query.startDate);
    startDate.setUTCHours(0, 0, 0, 0);
    const endDate = new Date(_req.query.endDate);
    endDate.setUTCHours(23, 59, 59, 999);

    // samo striktne u rangu
    const reservations = await Reservation.find({
      startDate: { $gte: startDate },
      endDate: { $lte: endDate },
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
