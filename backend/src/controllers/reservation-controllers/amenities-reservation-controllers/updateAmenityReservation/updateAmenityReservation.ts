import { type Response, type NextFunction } from "express";
import type { UpdateAmenityReservationRequest } from "./types.ts";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";
import { amenityReservationSimpleSchema } from "../../../../schemas/amenityReservation.response.schema.ts";
import { USER_ROLE } from "../../../../utils/enums.ts";

export async function updateAmenityReservation(
  req: UpdateAmenityReservationRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (
      req.session.role === USER_ROLE.guest &&
      req.body.guest !== req.session.guest
    )
      return res
        .status(401)
        .json({ message: "Unauthorized. Guests do not match." });

    const { guest, startTime, endTime, numberOfPeople, status } = req.body;
    const amres = new AmenityReservation({
      guest,
      startTime,
      endTime,
      numberOfPeople,
      status,
    });
    const parsed = amenityReservationSimpleSchema.parse(req.body);

    const updatedRes = await AmenityReservation.findOneAndUpdate(
      { _id: req.params.id, guest: req.session.guest },
      { guest, startTime, endTime, numberOfPeople, status },
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
