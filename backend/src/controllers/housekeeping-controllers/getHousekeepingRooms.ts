import { type Request, type Response, type NextFunction } from "express";
import Room from "../../models/Room.ts";
import { getRoomArraySchema } from "../../schemas/room.response.schema.ts";
import { HOUSEKEEPING_OPTIONS } from "../../utils/enums.ts";

export async function getHousekeepingRooms(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const rooms = await Room.aggregate([
      // Look up reservations with startDate today that are assigned to this room
      {
        $lookup: {
          from: "room_reservations",
          let: { roomId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$assignedRoom", "$$roomId"] },
                startDate: { $gte: todayStart, $lte: todayEnd },
                resStatus: { $nin: ["cancelled", "checked_in"] },
              },
            },
            { $limit: 1 },
          ],
          as: "todayReservations",
        },
      },
      // Look up stays with checkIn today for this room
      {
        $lookup: {
          from: "stays",
          let: { roomId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$room", "$$roomId"] },
                checkIn: { $gte: todayStart, $lte: todayEnd },
                stStatus: { $nin: ["cancelled", "no_show"] },
              },
            },
            { $limit: 1 },
          ],
          as: "todayStays",
        },
      },
      // Compute priority: 0 = dirty + today booking, 1 = dirty, 2 = everything else
      {
        $addFields: {
          hasTodayBooking: {
            $gt: [
              {
                $add: [
                  { $size: "$todayReservations" },
                  { $size: "$todayStays" },
                ],
              },
              0,
            ],
          },
          isDirty: {
            $eq: ["$housekeeping", HOUSEKEEPING_OPTIONS.dirty],
          },
        },
      },
      {
        $addFields: {
          priority: {
            $cond: [
              { $and: ["$isDirty", "$hasTodayBooking"] },
              0,
              { $cond: ["$isDirty", 1, 2] },
            ],
          },
        },
      },
      { $sort: { priority: 1, roomnum: 1 } },
      // Remove temporary fields
      {
        $project: {
          todayReservations: 0,
          todayStays: 0,
          hasTodayBooking: 0,
          isDirty: 0,
          priority: 0,
        },
      },
    ]);

    const parsed = getRoomArraySchema.safeParse(rooms);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error in getHousekeepingRooms controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
