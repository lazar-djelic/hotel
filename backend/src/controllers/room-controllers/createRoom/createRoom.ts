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
    const parsed = roomSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

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
      rate,
      currency,
      photos,
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
      rate,
      currency,
      photos,
    });
    const newRoom = await room.save();
    res.status(200).json(newRoom);
  } catch (error) {
    console.error("Error in createRoom controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
