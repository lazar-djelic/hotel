import { type Request, type Response } from "express";
import { stripe } from "../../lib/stripe.ts";
import RoomReservation from "../../models/RoomReservation.ts";
import { roomReservationSchema } from "../../schemas/roomReservation.response.schema.ts";
import Taxes from "../../models/Taxes.ts";
import { taxesSchema } from "../../schemas/taxes.schema.ts";
import { CURRENCIES } from "../../utils/enums.ts";

export const createCheckoutSessionRoomres = async (
  req: Request,
  res: Response,
) => {
  try {
    const { roomresId } = req.body;

    const rawRoomres = await RoomReservation.findById(roomresId)
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

    const taxes = await Taxes.findOne({ _id: "taxes" });
    if (!taxes) return res.status(404).json({ message: "Taxes not found" });
    const parsedtax = taxesSchema.safeParse(taxes);
    if (!parsedtax.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsedtax.error.issues });
    }

    const curr =
      roomres.assignedRoom.currency === CURRENCIES.rsd ? "rsd" : "eur";
    const days = Math.floor(
      (roomres.endDate.getTime() - roomres.startDate.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: curr,
            product_data: {
              name: String(roomres.assignedRoom.roomnum),
            },
            unit_amount: roomres.assignedRoom.rate * 100,
          },
          quantity: days,
        },
        {
          price_data: {
            currency: curr,
            product_data: {
              name: "Boravišna taksa (odrasli) / Tourist tax (adults)",
            },
            unit_amount: taxes.touristTaxAd * 100,
          },
          quantity: days * roomres.adults,
        },
        ...(roomres.children > 0
          ? [
              {
                price_data: {
                  currency: curr,
                  product_data: {
                    name: "Boravišna taksa (deca) / Tourist tax (children)",
                  },
                  unit_amount: taxes.touristTaxCh * 100,
                },
                quantity: days * roomres.children,
              },
            ]
          : []),
      ],
      success_url: `${process.env.CLIENT_PAYMENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_PAYMENT_URL}/cancel`,
      metadata: {
        type: "roomres",
        roomresId,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Room reservation checkout error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong when paying for room reservation" });
  }
};
