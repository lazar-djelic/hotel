import { type Response } from "express";
import type { DeleteAmenityReservationRequest } from "./types.ts";
import mongoose from "mongoose";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";

export async function deleteAmenityReservation(
  req: DeleteAmenityReservationRequest,
  res: Response,
) {
  try {
    const reservation = await AmenityReservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Amenity reservation not found" });
    }

    const deletedReservation = await AmenityReservation.findByIdAndDelete(
      req.params.id,
    );

    res
      .status(200)
      .json({ message: "Amenity reservation deleted successfully" });
  } catch (error) {
    console.error("Error in deleteAmenityReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
