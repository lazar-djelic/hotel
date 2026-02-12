import { type Response, type NextFunction } from "express";
import type { GetRoomsRequst } from "./types.ts";
import Room from "../../../models/Room.ts";
import { roomArraySchema } from "../../../schemas/room.response.schema.ts";

export async function getAllRooms(
  _req: GetRoomsRequst,
  res: Response,
  next: NextFunction,
) {
  try {
    const room = _req.query.room;
    let rooms;

    if (room == 0) {
      rooms = await Room.find().sort({ roomnum: -1 }).lean();
    } else {
      rooms = await Room.find({
        roomnum: room,
      })
        .sort({ roomnum: -1 })
        .lean();
    }

    // const rooms = await Room.find({
    //   roomnum: room,
    // })
    //   .sort({ roomnum: -1 })
    //   .lean();
    const parsed = roomArraySchema.parse(rooms);
    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error in getAllRooms controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
