import { type Response, type NextFunction } from "express";
import type { GetAmenityRequest } from "./types.ts";
import { Amenity } from "../../../models/Amenity.ts";
import { amenitySchema } from "../../../schemas/amenity.response.schema.ts";

export async function getAmenity(
  req: GetAmenityRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const amenity = await Amenity.findById(req.params.id);

    if (!amenity) return res.status(404).json({ message: "Amenity not found" });

    const parsed = amenitySchema.safeParse(amenity);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getAmenity controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
