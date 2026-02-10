import { type Response } from "express";
import type { DeleteRoomRequest } from "./types.ts";
import Room from "../../../models/Room.ts";

export async function deleteRoom(req: DeleteRoomRequest, res: Response) {
  try {
    const deletedRoom = await Room.findByIdAndDelete(req.params.id);
    if (!deletedRoom)
      return res.status(404).json({ message: "Room not found" });
    res.status(200).json({ message: "Room deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteRoom controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
