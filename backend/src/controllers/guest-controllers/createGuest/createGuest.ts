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
    const parsed = guestSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

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
    const newGuest = await guest.save();

    if (req.session.role === "guest") {
      await User.findByIdAndUpdate(
        req.session.userId,
        { guest: newGuest._id },
        { new: true },
      );
    }

    res.status(200).json(newGuest);
  } catch (error) {
    console.error("Error in createGuest controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
