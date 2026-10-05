import { type Response, type NextFunction } from "express";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";
import { amenityReservationSimpleSchema } from "../../../../schemas/amenityReservation.response.schema.ts";
import { USER_ROLE } from "../../../../utils/enums.ts";
import type { UpdateAmenityReservationReceptionRequest } from "./types.ts";

export async function updateAmenityReservationReception(
  req: UpdateAmenityReservationReceptionRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = amenityReservationSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const { amenity, startTime, endTime, numberOfPeople, status } = req.body;
    const amres = new AmenityReservation({
      amenity,
      startTime,
      endTime,
      numberOfPeople,
      status,
    });

    const updatedRes = await AmenityReservation.findOneAndUpdate(
      { _id: req.params.id },
      {
        amenity: amenity,
        startTime: startTime,
        endTime: endTime,
        numberOfPeople: numberOfPeople,
        status: status,
      },
      {
        new: true,
      },
    );

    if (!updatedRes)
      return res.status(404).json({ message: "Amenity reservation not found" });
    res.status(200).json(updatedRes);
  } catch (error) {
    console.error("Error in updateAmenityReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
