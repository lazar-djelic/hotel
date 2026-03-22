import { type Response, type NextFunction } from "express";
import type { GetRoomRequest } from "./types.ts";
import Room from "../../../models/Room.ts";
import { roomSchema } from "../../../schemas/room.response.schema.ts";

export async function getRoomById(
  req: GetRoomRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) return res.status(404).json({ message: "Room not found" });
    const parsed = roomSchema.safeParse(room);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getRoomById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
