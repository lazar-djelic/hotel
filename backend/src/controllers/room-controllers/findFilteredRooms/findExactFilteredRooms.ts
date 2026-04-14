import type { Response, NextFunction } from "express";
import {
  SimpleFindFilteredRoomsRequestSchema,
  type FindFilteredRoomsRequest,
} from "./types.ts";
import {
  ROOM_STATUS,
  RESERVATION_STATUS,
  STAY_STATUS,
} from "../../../utils/enums.ts";
import Room from "../../../models/Room.ts";
import RoomReservation from "../../../models/RoomReservation.ts";
import { Stay } from "../../../models/Stay.ts";
import {
  getRoomArraySchema,
  getRoomSchema,
  roomArraySchema,
} from "../../../schemas/room.response.schema.ts";

export async function findExactFilteredRooms(
  req: FindFilteredRoomsRequest,
  res: Response,
  next: NextFunction,
) {
  const parsed = SimpleFindFilteredRoomsRequestSchema.safeParse(req.body);

  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Validation failed", errors: parsed.error.issues });
  }

  const filters = parsed.data;

  try {
    const optionalFields = [
      "smoking",
      "accessibility",
      "view",
      "balcony",
      "pets",
    ];

    const match: any = {
      type: filters.roomType,
      bednum: filters.bedNum,
      status: { $ne: ROOM_STATUS.outofservice },
    };

    // Add optional filters ONLY if they are provided
    optionalFields.forEach((field) => {
      if ((filters as any)[field] !== undefined) {
        match[field] = (filters as any)[field];
      }
    });

    const pipeline = [
      {
        $match: match,
      },
      {
        $lookup: {
          from: "room_reservations",
          localField: "_id",
          foreignField: "assignedRoom",
          as: "reservations",
        },
      },
      {
        $lookup: {
          from: "stays",
          localField: "_id",
          foreignField: "room",
          as: "stays",
        },
      },
      {
        $match: {
          $and: [
            {
              $or: [
                { reservations: { $size: 0 } },
                {
                  reservations: {
                    $not: {
                      $elemMatch: {
                        resStatus: { $ne: RESERVATION_STATUS.cancelled },
                        startDate: { $lt: filters.endDate },
                        endDate: { $gt: filters.startDate },
                      },
                    },
                  },
                },
              ],
            },
            {
              $or: [
                { stays: { $size: 0 } },
                {
                  stays: {
                    $not: {
                      $elemMatch: {
                        stStatus: {
                          $nin: [
                            STAY_STATUS.checked_out,
                            STAY_STATUS.cancelled,
                            STAY_STATUS.no_show,
                          ],
                        },
                        checkIn: { $lt: filters.endDate },
                        checkOut: { $gt: filters.startDate, $ne: null },
                      },
                    },
                  },
                },
              ],
            },
          ],
        },
      },
      {
        $project: {
          reservations: 0,
          stays: 0,
        },
      },
    ];

    const rooms = await Room.aggregate(pipeline);

    if (rooms.length === 0) {
      return res.status(404).json({
        message: "No available room matching the requested criteria.",
      });
    }

    const parsed = getRoomArraySchema.safeParse(rooms);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(rooms);
  } catch (error) {
    console.error("Error in findFilteredRooms controller", error);
    res.status(500).json({
      message: "Internal server error. There is a problem with finding a room.",
    });
  }
}
