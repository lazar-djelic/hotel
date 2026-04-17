import { type Request, type Response } from "express";
import { stripe } from "../../lib/stripe.ts";
import { AmenityReservation } from "../../models/AmenityReservation.ts";
import { getAmenityReservationSchema } from "../../schemas/amenityReservation.response.schema.ts";
import { CURRENCIES } from "../../utils/enums.ts";

export const createCheckoutSessionAmres = async (
  req: Request,
  res: Response,
) => {
  try {
    const { amresId } = req.body;

    const rawAmres =
      await AmenityReservation.findById(amresId).populate("amenity");
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

    const curr = amres.currency === CURRENCIES.rsd ? "rsd" : "eur";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: curr,
            product_data: {
              name: amres.amenity.name,
            },
            unit_amount: amres.rate * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_PAYMENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_PAYMENT_URL}/cancel?session_id={CHECKOUT_SESSION_ID}`,
      metadata: {
        type: "amres",
        amresId,
      },
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Amenity reservation checkout error:", error);
    res.status(500).json({
      error: "Something went wrong when paying for amenity reservation",
    });
  }
};
