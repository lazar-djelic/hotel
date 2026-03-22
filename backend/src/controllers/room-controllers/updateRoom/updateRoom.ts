import { type Response, type NextFunction } from "express";
import type { UpdateRoomRequest } from "./types.ts";
import Room from "../../../models/Room.ts";
import { roomSimpleSchema } from "../../../schemas/room.response.schema.ts";

export async function updateRoom(
  req: UpdateRoomRequest,
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

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      {
        new: true,
      },
    );

    if (!updatedRoom)
      return res.status(404).json({ message: "Room not found" });
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Error in updateRoom controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
