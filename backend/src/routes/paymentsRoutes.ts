import express from "express";
import { stripeWebhook } from "../controllers/stripe-controllers/stripeWebhook.ts";
import { createCheckoutSessionRoomres } from "../controllers/stripe-controllers/createCheckoutSessionRoomres.ts";
import { createCheckoutSessionStay } from "../controllers/stripe-controllers/createCheckoutSessionStay.ts";
import { createCheckoutSessionAmres } from "../controllers/stripe-controllers/createCheckoutSessionAmres.ts";
import { getCheckoutSession } from "../controllers/stripe-controllers/getCheckoutSession.ts";

const router = express.Router();

router.post("/create-checkout-session-stay", createCheckoutSessionStay);
router.post("/create-checkout-session-roomres", createCheckoutSessionRoomres);
router.post("/create-checkout-session-amres", createCheckoutSessionAmres);

router.get("/checkout-session/:sessionId", getCheckoutSession);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook,
);

export default router;
