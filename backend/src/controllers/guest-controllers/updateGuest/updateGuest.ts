import { type Response, type NextFunction } from "express";
import type { UpdateGuestRequest } from "./types.ts";
import Guest from "../../../models/Guest.ts";
import { guestSimpleSchema } from "../../../schemas/guest.response.schema.ts";

export async function updateGuest(
  req: UpdateGuestRequest,
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

    const updatedGuest = await Guest.findByIdAndUpdate(
      req.params.id,
      {
        fName,
        lName,
        phone,
        email,
        address,
        personalID,
        birthDate,
        notes,
      },
      {
        new: true,
      },
    );

    if (!updatedGuest)
      return res.status(404).json({ message: "Guest not found" });
    res.status(200).json(updatedGuest);
  } catch (error) {
    console.error("Error in updateGuest controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
