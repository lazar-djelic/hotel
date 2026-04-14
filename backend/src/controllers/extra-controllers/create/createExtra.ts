import { type Response, type NextFunction } from "express";
import type { CreateExtraRequest } from "./types.ts";
import { extraSimpleSchema } from "../../../schemas/extra.response.schema.ts";
import Extra from "../../../models/Extra.ts";

export async function createExtra(
  req: CreateExtraRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const parsed = extraSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const { nameEng, nameSrb, price } = req.body;
    const extra = new Extra({ nameEng, nameSrb, price });
    const newExtra = await extra.save();
    res.status(200).json(newExtra);
  } catch (error) {
    console.error("Error in createExtra controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
