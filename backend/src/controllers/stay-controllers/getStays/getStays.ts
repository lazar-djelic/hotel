import { type Response, type NextFunction } from "express";
import type { GetStaysRequest } from "./types.ts";
import { Stay } from "../../../models/Stay.ts";
import { stayArraySchema } from "../../../schemas/stay.response.schema.ts";

export async function getAllStays(
  _req: GetStaysRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const startD = new Date(_req.query.startDate);
    startD.setUTCHours(0, 0, 0, 0);
    const endD = new Date(_req.query.endDate);
    endD.setUTCHours(23, 59, 59, 999);

    const stays = await Stay.find({
      checkIn: { $lte: endD },
      checkOut: { $gte: startD },
    })
      .populate("guest")
      .populate("reservation")
      .populate("room")
      .sort({ createdAt: -1 })
      .lean();

    const parsed = stayArraySchema.safeParse(stays);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(stays);
  } catch (error) {
    console.error("Error in getAllStays controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
