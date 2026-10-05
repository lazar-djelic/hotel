import { type Response, type NextFunction } from "express";
import Guest from "../../../models/Guest.ts";
import { guestSchema } from "../../../schemas/guest.response.schema.ts";
import type { FindGuestRequest } from "./types.ts";

export async function findGuest(
  req: FindGuestRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    let guest = null;

    const { email, personalID } = req.query;
    if (personalID || email) {
      const query = [];

      if (email) query.push({ email });
      if (personalID) query.push({ personalID });

      guest = await Guest.findOne({ $or: query });
    }
    if (!guest) return res.status(404).json({ message: "Guest not found" });
    const parsed = guestSchema.safeParse(guest);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in findGuest controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
