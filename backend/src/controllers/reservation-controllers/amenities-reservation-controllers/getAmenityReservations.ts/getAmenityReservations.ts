import { type Response, type NextFunction } from "express";
import type { GetAmenityReservationsRequest } from "./types.ts";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";
import { amenityReservationArraySchema } from "../../../../schemas/amenityReservation.response.schema.ts";

export async function getAmenityReservations(
  req: GetAmenityReservationsRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const startD = new Date(req.query.startDate);
    startD.setUTCHours(0, 0, 0, 0);
    const endD = new Date(req.query.endDate);
    endD.setUTCHours(23, 59, 59, 999);

    const reservations = await AmenityReservation.find({
      amenity: req.params.id,
      startTime: { $lte: endD },
      endTime: { $gte: startD },
    })
      .populate("amenity")
      .populate("guest")
      .sort({ createdAt: -1 });

    const parsed = amenityReservationArraySchema.parse(reservations);
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error in getAmenityReservations controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
