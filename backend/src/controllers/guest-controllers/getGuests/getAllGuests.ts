import { type Response, type NextFunction } from "express";
import type { GetGuestsRequest } from "./types.ts";
import Guest from "../../../models/Guest.ts";
import { guestArraySchema } from "../../../schemas/guest.response.schema.ts";

export async function getAllGuests(
  _req: GetGuestsRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 }).lean();
    const parsed = guestArraySchema.safeParse(guests);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getAllGuests controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
