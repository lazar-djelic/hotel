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
    const parsed = roomSchema.parse(room);
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in getRoomById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
