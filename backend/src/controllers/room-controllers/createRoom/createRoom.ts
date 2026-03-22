import { type Response, type NextFunction } from "express";
import type { CreateRoomRequest } from "./types.ts";
import Room from "../../../models/Room.ts";
import { roomSimpleSchema } from "../../../schemas/room.response.schema.ts";

export async function createRoom(
  req: CreateRoomRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const {
      floor,
      roomnum,
      type,
      bednum,
      smoking,
      accessibility,
      view,
      balcony,
      status,
      housekeeping,
      lastcleaned,
      linkedroom,
      pets,
    } = req.body;

    const room = new Room({
      floor,
      roomnum,
      type,
      bednum,
      smoking,
      accessibility,
      view,
      balcony,
      status,
      housekeeping,
      lastcleaned,
      linkedroom,
      pets,
    });
    const parsed = roomSimpleSchema.parse(room);
    await room.save();
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in createRoom controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
