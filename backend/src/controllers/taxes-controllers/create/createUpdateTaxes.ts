import { type Response, type NextFunction } from "express";
import type { CreateTaxesRequest } from "./types.ts";
import { taxesSimpleSchema } from "../../../schemas/taxes.schema.ts";
import Taxes from "../../../models/Taxes.ts";

export async function createUpdateTaxes(
  req: CreateTaxesRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = taxesSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const taxes = await Taxes.findByIdAndUpdate("taxes", req.body, {
      upsert: true,
      new: true,
    });

    res.status(200).json(taxes);
  } catch (error) {
    console.error("Error in createTaxes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
