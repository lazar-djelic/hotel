import { type Request, type Response } from "express";
import { stripe } from "../../lib/stripe.ts";
import { Stay } from "../../models/Stay.ts";
import RoomReservation from "../../models/RoomReservation.ts";
import { AmenityReservation } from "../../models/AmenityReservation.ts";

export const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"]!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as any;

    const type = session.metadata.type;
    const paymentIntentId = session.payment_intent;

    if (type === "roomres") {
      const roomresId = session.metadata.roomresId;

      await RoomReservation.findByIdAndUpdate(roomresId, {
        paid: true,
        paidDate: new Date(event.created * 1000),
        paymentIntentId,
        checkoutSessionId: session.id,
      });
    }

    if (type === "stay") {
      const stayId = session.metadata.stayId;

      await Stay.findByIdAndUpdate(stayId, {
        paid: true,
        paidDate: new Date(event.created * 1000),
      });
    }

    if (type === "amres") {
      const amresId = session.metadata.amresId;

      await AmenityReservation.findByIdAndUpdate(amresId, {
        paid: true,
        paidDate: new Date(event.created * 1000),
      });
    }
  }

  if (event.type === "charge.refunded") {
    const charge = event.data.object as any;
    const paymentIntentId = charge.payment_intent;

    const roomres = await RoomReservation.findOne({ paymentIntentId });
    if (roomres) {
      await RoomReservation.findOneAndUpdate(
        { paymentIntentId },
        { refunded: true },
      );
      return;
    }

    const amres = await AmenityReservation.findOne({ paymentIntentId });
    if (amres) {
      await AmenityReservation.findOneAndUpdate(
        { paymentIntentId },
        { refunded: true },
      );
    }
  }

  res.json({ received: true });
};
