import { type Response, type NextFunction } from "express";
import type { UpdateExtraRequest } from "./types.ts";
import { extraSimpleSchema } from "../../../schemas/extra.response.schema.ts";
import Extra from "../../../models/Extra.ts";

export async function updateExtra(
  req: UpdateExtraRequest,
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

    const updatedExtra = await Extra.findByIdAndUpdate(
      { _id: req.params.id },
      { nameEng, nameSrb, price },
      {
        new: true,
      },
    );

    if (!updatedExtra)
      return res.status(404).json({ message: "Extra not found" });
    res.status(200).json(updatedExtra);
  } catch (error) {
    console.error("Error in updateExtra controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
