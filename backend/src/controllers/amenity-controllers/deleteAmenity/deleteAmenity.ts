import { type Response } from "express";
import type { DeleteAmenityRequest } from "./types.ts";
import { Amenity } from "../../../models/Amenity.ts";

export async function deleteAmenity(req: DeleteAmenityRequest, res: Response) {
  try {
    const deletedAmenity = await Amenity.findByIdAndDelete(req.params.id);
    if (!deletedAmenity)
      return res.status(404).json({ message: "Amenity not found" });
    res.status(200).json({ message: "Amenity deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAmenity controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
