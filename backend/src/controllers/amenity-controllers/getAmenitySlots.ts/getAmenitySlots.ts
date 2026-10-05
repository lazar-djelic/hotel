import { type Response, type NextFunction } from "express";
import { generateSlots } from "../../reservation-controllers/amenities-reservation-controllers/helpingFunctions/generateSlots.ts";
import type { GetAmenitySlotsRequest } from "./types.ts";

export const getAmenitySlots = async (
  req: GetAmenitySlotsRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const amenityId = req.params.id;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({
        message: "Date is required",
      });
    }

    const selectedDate = new Date(date as string);

    const slots = await generateSlots(amenityId, selectedDate);

    return res.status(200).json({
      slots,
    });
  } catch (err) {
    next(err);
  }
};
