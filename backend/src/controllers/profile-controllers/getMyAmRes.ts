import type { Request, Response, NextFunction } from "express";
import { USER_ROLE } from "../../utils/enums.ts";
import { AmenityReservation } from "../../models/AmenityReservation.ts";
import { getAmenityReservationArraySchema } from "../../schemas/amenityReservation.response.schema.ts";

export async function getMyAmRes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.session.role === USER_ROLE.guest && !req.session.guest) {
      return res.status(400).json({
        message: "User didn't enter personal data.",
      });
    }

    const guest = req.session.guest;

    const amres = await AmenityReservation.find({ guest })
      .populate("amenity")
      .sort({ createdAt: -1 })
      .lean();

    if (!amres) {
      return res.status(400).json({
        message: "User doesn't have amenity reservations.",
      });
    }

    const parsed = getAmenityReservationArraySchema.safeParse(amres);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getMyAmRes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
