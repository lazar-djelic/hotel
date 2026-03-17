import { type Response, type NextFunction } from "express";
import type { CreateGuestRequest } from "./types.ts";
import Guest from "../../../models/Guest.ts";
import { guestSimpleSchema } from "../../../schemas/guest.response.schema.ts";
import User from "../../../models/User.ts";

export async function createGuest(
  req: CreateGuestRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      fName,
      lName,
      phone,
      email,
      address,
      personalID,
      birthDate,
      notes,
    } = req.body;
    const guest = new Guest({
      fName,
      lName,
      phone,
      email,
      address,
      personalID,
      birthDate,
      notes,
    });
    const parsed = guestSimpleSchema.parse(guest);
    const newGuest = await guest.save();

    if (req.session.role === "guest") {
      console.log("usao");
      await User.findByIdAndUpdate(
        req.session.userId,
        { guest: newGuest._id },
        { new: true },
      );
    }

    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in createGuest controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
