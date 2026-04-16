import { type Response, type NextFunction } from "express";
import type { CreateAmenityRequest } from "./types.ts";
import { Amenity } from "../../../models/Amenity.ts";
import { amenitySimpleSchema } from "../../../schemas/amenity.response.schema.ts";

export async function createAmenity(
  req: CreateAmenityRequest,
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
      price,
      currency,
    } = req.body;

    const existingAmenity = await Amenity.findOne({ name, type });
    if (existingAmenity) {
      return res.status(400).json({
        message: "Amenity already exists",
      });
    }

    const amenity = new Amenity({
      name,
      type,
      capacity,
      slotDuration,
      openTime,
      closeTime,
      requiresReservation,
      onePerSlot,
      price,
      currency,
    });
    const newAmenity = await amenity.save();
    res.status(200).json(newAmenity);
  } catch (error) {
    console.error("Error in createAmenity controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
