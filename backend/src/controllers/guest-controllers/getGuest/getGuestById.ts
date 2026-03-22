import { type Response, type NextFunction } from "express";
import type { GetGuestRequest } from "./types.ts";
import Guest from "../../../models/Guest.ts";
import { guestSchema } from "../../../schemas/guest.response.schema.ts";

export async function getGuestById(
  req: GetGuestRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const guest = await Guest.findById(req.params.id);
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    const parsed = guestSchema.safeParse(guest);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getGuestById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
