import { type Request, type Response, type NextFunction } from "express";
import { validateAmenityBooking } from "../helpingFunctions/validateAmenityBooking.ts";
import { Amenity } from "../../../../models/Amenity.ts";
import { AmenityReservation } from "../../../../models/AmenityReservation.ts";
import {
  CreateAmenityReservationRequestSchema,
  CreateAmenityReservationBodySchema,
  type CreateAmenityReservationRequest,
} from "./types.ts";
import { AM_RES_STATUS, USER_ROLE } from "../../../../utils/enums.ts";
import mongoose from "mongoose";

export const createAmenityReservation = async (
  req: CreateAmenityReservationRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.session.role === USER_ROLE.guest && !req.session.guest) {
      return res.status(400).json({
        message: "Cannot create reservation without personal information.",
      });
    }

    const parsed = CreateAmenityReservationBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const amenityId = req.params.id;

    const { startTime, endTime, numberOfPeople, user, guest } = parsed.data;

    const start = new Date(startTime);
    const end = new Date(endTime);

    if (start >= end) {
      return res.status(400).json({
        message: "Invalid time range",
      });
    }

    const session = await mongoose.startSession();

    try {
      session.startTransaction();

      const amenity = await Amenity.findById(amenityId).session(session);
      if (!amenity) {
        await session.abortTransaction();
        session.endSession();
        return res.status(404).json({
          message: "Amenity not found",
        });
      }

      if (!amenity.requiresReservation) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          message: "This amenity does not allow reservations",
        });
      }

      if (amenity.onePerSlot) {
        const existingReservation = await AmenityReservation.findOne({
          amenity: amenityId,
          status: AM_RES_STATUS.booked,
          startTime: { $lt: end },
          endTime: { $gt: start },
        }).session(session);

        if (existingReservation) {
          await session.abortTransaction();
          session.endSession();
          return res.status(400).json({
            message: "This amenity can only have one reservation per time slot",
          });
        }
      }

      const success = await validateAmenityBooking({
        amenityId,
        startTime: start,
        endTime: end,
        numberOfPeople,
      });

      if (!success) {
        await session.abortTransaction();
        session.endSession();
        return res.status(400).json({
          message:
            "Amenity cannot be booked for the selected time slot. Change capacity or choose a different time.",
        });
      }

      const reservation = await AmenityReservation.create(
        [
          {
            amenity: amenityId,
            user: user,
            guest: guest,
            startTime: start,
            endTime: end,
            numberOfPeople: numberOfPeople,
            status: AM_RES_STATUS.booked,
            rate: amenity.price,
            currency: amenity.currency,
          },
        ],
        { session },
      );

      await session.commitTransaction();
      session.endSession();

      return res.status(201).json({
        message: "Reservation created successfully",
        reservation: reservation[0],
      });
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      throw err;
    }
  } catch (err) {
    next(err);
  }
};
