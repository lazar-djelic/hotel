import { type Request, type Response, type NextFunction } from "express";
import CancelPeriod from "../../../models/CancelPeriod.ts";
import { cancelPeriodSchema } from "../../../schemas/cancelPeriod.response.schema.ts";

export async function getCancelPeriod(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const cper = await CancelPeriod.findOne({ _id: "cancel_period" });
    if (!cper)
      return res.status(404).json({ message: "Cancel period not found" });
    const parsed = cancelPeriodSchema.safeParse(cper);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getCancelPeriod controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
