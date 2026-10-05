import { type Request, type Response, type NextFunction } from "express";
import Taxes from "../../../models/Taxes.ts";
import { taxesSchema } from "../../../schemas/taxes.schema.ts";

export async function getTaxes(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const taxes = await Taxes.findOne({ _id: "taxes" });
    if (!taxes) return res.status(404).json({ message: "Taxes not found" });
    const parsed = taxesSchema.safeParse(taxes);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getTaxes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
