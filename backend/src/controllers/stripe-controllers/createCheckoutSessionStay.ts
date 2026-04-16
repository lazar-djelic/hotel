import { type Request, type Response } from "express";
import { stripe } from "../../lib/stripe.ts";
import { Stay } from "../../models/Stay.ts";
import { staySchema } from "../../schemas/stay.response.schema.ts";
import { CURRENCIES } from "../../utils/enums.ts";
import Taxes from "../../models/Taxes.ts";
import { taxesSchema } from "../../schemas/taxes.schema.ts";

export const createCheckoutSessionStay = async (
  req: Request,
  res: Response,
) => {
  try {
    const { stayId } = req.body;

    const rawStay = await Stay.findById(stayId)
      .populate("guest")
      .populate("reservation")
      .populate("room")
      .populate("extras.extra");
    if (!rawStay) return res.status(404).json({ message: "Stay not found" });
    const parsedstay = staySchema.safeParse(rawStay);
    if (!parsedstay.success) {
      return res.status(400).json({
        message: "Validation failed",
        errors: parsedstay.error.issues,
      });
    }
    const stay = parsedstay.data;

    const taxes = await Taxes.findOne({ _id: "taxes" });
    if (!taxes) return res.status(404).json({ message: "Taxes not found" });
    const parsedtax = taxesSchema.safeParse(taxes);
    if (!parsedtax.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsedtax.error.issues });
    }

    const curr = stay.currency === CURRENCIES.rsd ? "rsd" : "eur";
    const days = Math.floor(
      (stay.checkOut.getTime() - stay.checkIn.getTime()) /
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
              name: String(stay.room.roomnum),
            },
            unit_amount: stay.rate * 100,
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
          quantity: days * stay.adults,
        },
        ...(stay.children > 0
          ? [
              {
                price_data: {
                  currency: curr,
                  product_data: {
                    name: "Boravišna taksa (deca) / Tourist tax (children)",
                  },
                  unit_amount: taxes.touristTaxCh * 100,
                },
                quantity: days * stay.children,
              },
            ]
          : []),
        ...stay.extras.map((e) => ({
          price_data: {
            currency: curr,
            product_data: {
              name: `${e.extra.nameSrb} / ${e.extra.nameEng}`,
            },
            unit_amount: e.extra.price * 100,
          },
          quantity: e.amount,
        })),
      ],
      success_url: `${process.env.CLIENT_PAYMENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_PAYMENT_URL}/cancel`,
      metadata: {
        type: "stay",
        stayId,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stay checkout error:", error);
    res
      .status(500)
      .json({ error: "Something went wrong when paying for stay" });
  }
};
