import { type Response, type NextFunction } from "express";
import type { GetGuestsRequst } from "./types.ts";
import Guest from "../../../models/Guest.ts";
import { guestArraySchema } from "../../../schemas/guest.response.schema.ts";

export async function getAllGuests(
  _req: GetGuestsRequst,
  res: Response,
  next: NextFunction,
) {
  try {
    const guests = await Guest.find().sort({ createdAt: -1 }).lean();
    const parsed = guestArraySchema.parse(guests);
    res.status(200).json(guests);
  } catch (error) {
    console.error("Error in getAllGuests controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
