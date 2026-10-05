import { type Response, type NextFunction } from "express";
import type { GetAmenitiesRequest } from "./types.ts";
import { Amenity } from "../../../models/Amenity.ts";
import { amenityArraySchema } from "../../../schemas/amenity.response.schema.ts";

export async function getAmenities(
  _req: GetAmenitiesRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const amenities = await Amenity.find().sort({ name: 1 }).lean();
    const parsed = amenityArraySchema.safeParse(amenities);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getAmenities controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
