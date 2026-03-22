import { type Response, type NextFunction } from "express";
import type { UpdateAmenityRequest } from "./types.ts";
import { Amenity } from "../../../models/Amenity.ts";
import { amenitySimpleSchema } from "../../../schemas/amenity.response.schema.ts";

export async function updateAmenity(
  req: UpdateAmenityRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = amenitySimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const {
      name,
      type,
      capacity,
      slotDuration,
      openTime,
      closeTime,
      requiresReservation,
      onePerSlot,
    } = req.body;

    const amenity = new Amenity({
      name,
      type,
      capacity,
      slotDuration,
      openTime,
      closeTime,
      requiresReservation,
      onePerSlot,
    });

    const updatedAmenity = await Amenity.findByIdAndUpdate(
      req.params.id,
      {
        name,
        type,
        capacity,
        slotDuration,
        openTime,
        closeTime,
        requiresReservation,
        onePerSlot,
      },
      {
        new: true,
      },
    );

    if (!updatedAmenity)
      return res.status(404).json({ message: "Amenity not found" });
    res.status(200).json(updatedAmenity);
  } catch (error) {
    console.error("Error in updateAmenity controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
