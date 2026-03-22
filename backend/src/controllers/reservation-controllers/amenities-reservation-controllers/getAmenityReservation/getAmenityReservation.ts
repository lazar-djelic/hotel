import { type Response, type NextFunction } from "express";
import type { GetAmenityReservationRequest } from "./types.ts";
import { USER_ROLE } from "../../../../utils/enums.ts";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";
import { amenityReservationSchema } from "../../../../schemas/amenityReservation.response.schema.ts";

export async function getAmenityReservation(
  req: GetAmenityReservationRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const filter: any = { _id: req.params.id };

    if (req.session.role === USER_ROLE.guest) {
      filter.guest = req.session.guest;
    }

    const amres = await AmenityReservation.findOne(filter)
      .populate("amenity")
      .populate("guest");

    if (!amres)
      return res.status(404).json({ message: "Amenity reservation not found" });
    const parsed = amenityReservationSchema.parse(amres);
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in getAmenityReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
