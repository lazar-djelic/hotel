import { type Request, type Response } from "express";
import { stripe } from "../../../lib/stripe.ts";
import RoomReservation from "../../../models/RoomReservation.ts";
import { roomReservationSchema } from "../../../schemas/roomReservation.response.schema.ts";
import { RESERVATION_STATUS } from "../../../utils/enums.ts";
import CancelPeriod from "../../../models/CancelPeriod.ts";

export const cancelRoomres = async (req: Request, res: Response) => {
  try {
    const { id: reservationId } = req.body;

    const rawRoomres = await RoomReservation.findById(reservationId)
      .populate("guest")
      .populate("assignedRoom");
    if (!rawRoomres)
      return res.status(404).json({ message: "Room reservation not found" });
    const parsedroomres = roomReservationSchema.safeParse(rawRoomres);
    if (!parsedroomres.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedroomres.error.issues,
      });
    }
    const roomres = parsedroomres.data;

    const cancelPeriod = await CancelPeriod.findById("cancel_period");
    let hours;
    if (!cancelPeriod) hours = 24;
    else hours = cancelPeriod.hours;

    const hoursUntilStart =
      (new Date(roomres.startDate).getTime() - Date.now()) / (1000 * 60 * 60);
    if (hoursUntilStart < hours) {
      return res
        .status(400)
        .json({ message: "Cancellation period has passed" });
    }

    rawRoomres.resStatus = RESERVATION_STATUS.cancelled;
    await rawRoomres.save();

    if (!roomres.paid || !roomres.paymentIntentId) {
      return res.status(200).json({ message: "Cancelled. Not refundable." });
    }

    await stripe.refunds.create({
      payment_intent: roomres.paymentIntentId,
    });

    res.json({ message: "Room reservation cancelled and refunded" });
  } catch (err) {
    res.status(500).json({ message: "Room reservation cancellation failed" });
  }
};
