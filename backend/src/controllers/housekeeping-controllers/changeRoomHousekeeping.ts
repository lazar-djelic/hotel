import { type Response, type NextFunction } from "express";
import { housekeepingSimpleSchema, type housekeepingRequest } from "./types.ts";
import Room from "../../models/Room.ts";
import { HOUSEKEEPING_OPTIONS } from "../../utils/enums.ts";

export async function changeRoomHousekeeping(
  req: housekeepingRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = housekeepingSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const updateData: { housekeeping: string; lastcleaned?: Date } = {
      housekeeping: parsed.data.status,
    };

    if (parsed.data.status === HOUSEKEEPING_OPTIONS.clean) {
      updateData.lastcleaned = new Date();
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      { _id: req.params.id },
      updateData,
      {
        new: true,
      },
    );

    if (!updatedRoom)
      return res.status(404).json({ message: "Room not found" });
    res.status(200).json(updatedRoom);
  } catch (error) {
    console.error("Error in changeRoomHousekeeping controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
