import { type Response, type NextFunction } from "express";
import type { CreateCancelPeriodRequest } from "./types.ts";
import { cancelPeriodSimpleSchema } from "../../../schemas/cancelPeriod.response.schema.ts";
import CancelPeriod from "../../../models/CancelPeriod.ts";

export async function createUpdateCancelPeriod(
  req: CreateCancelPeriodRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = cancelPeriodSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const period = await CancelPeriod.findByIdAndUpdate(
      "cancel_period",
      req.body,
      {
        upsert: true,
        new: true,
      },
    );

    res.status(200).json(period);
  } catch (error) {
    console.error("Error in createCancelPeriod controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
