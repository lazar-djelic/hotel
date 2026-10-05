import { type Request, type Response } from "express";
import { stripe } from "../../lib/stripe.ts";

export const getCheckoutSession = async (req: Request, res: Response) => {
  try {
    const { sessionId } = req.params;

    if (!sessionId) return res.status(404).json({ error: "No sessionId" });

    const session = await stripe.checkout.sessions.retrieve(sessionId);

    res.json({
      type: session.metadata?.type || null,
      metadata: session.metadata,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve checkout session" });
  }
};
