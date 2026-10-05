import { type Request, type Response } from "express";
import { stripe } from "../../../lib/stripe.ts";
import CancelPeriod from "../../../models/CancelPeriod.ts";
import { AmenityReservation } from "../../../models/AmenityReservation.ts";
import { getAmenityReservationSchema } from "../../../schemas/amenityReservation.response.schema.ts";
import { AM_RES_STATUS } from "../../../utils/enums.ts";

export const cancelAmres = async (req: Request, res: Response) => {
  try {
    const { id: reservationId } = req.body;
    console.log("resid:", reservationId);

    const rawAmres =
      await AmenityReservation.findById(reservationId).populate("amenity");
    if (!rawAmres)
      return res.status(404).json({ message: "Amenity reservation not found" });
    const parsedamres = getAmenityReservationSchema.safeParse(rawAmres);
    if (!parsedamres.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedamres.error.issues,
      });
    }
    const amres = parsedamres.data;

    const cancelPeriod = await CancelPeriod.findById("cancel_period");
    let hours;
    if (!cancelPeriod) hours = 24;
    else hours = cancelPeriod.hours;

    const hoursUntilStart =
      (new Date(amres.startTime).getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursUntilStart < hours) {
      return res
        .status(400)
        .json({ message: "Cancellation period has passed" });
    }

    rawAmres.status = AM_RES_STATUS.cancelled;
    await rawAmres.save();

    if (!amres.paid || !amres.paymentIntentId) {
      return res.status(200).json({ message: "Cancelled. Not refundable." });
    }

    await stripe.refunds.create({
      payment_intent: amres.paymentIntentId,
    });

    res.json({ message: "Amenity reservation cancelled and refunded" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Amenity reservation cancellation failed" });
  }
};
