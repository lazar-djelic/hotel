import { type Response } from "express";
import type { DeleteGuestRequest } from "./types.ts";
import Guest from "../../../models/Guest.ts";

export async function deleteGuest(req: DeleteGuestRequest, res: Response) {
  try {
    const deletedGuest = await Guest.findByIdAndDelete(req.params.id);
    if (!deletedGuest)
      return res.status(404).json({ message: "Guest not found" });
    res.status(200).json({ message: "Guest deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteGuest controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
