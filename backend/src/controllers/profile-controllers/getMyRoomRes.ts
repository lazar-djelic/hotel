import type { Request, Response, NextFunction } from "express";
import { USER_ROLE } from "../../utils/enums.ts";
import RoomReservation from "../../models/RoomReservation.ts";
import { getMyRoomReservationArraySchema } from "../../schemas/roomReservation.response.schema.ts";

export async function getMyRoomRes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.session.role === USER_ROLE.guest && !req.session.guest) {
      return res.status(400).json({
        message: "User didn't enter personal data.",
      });
    }

    const guest = req.session.guest;

    const roomres = await RoomReservation.find({ guest })
      .populate("assignedRoom")
      .sort({ createdAt: -1 })
      .lean();

    if (!roomres) {
      return res.status(400).json({
        message: "User doesn't have room reservations.",
      });
    }

    const parsed = getMyRoomReservationArraySchema.safeParse(roomres);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getMyRoomRes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
