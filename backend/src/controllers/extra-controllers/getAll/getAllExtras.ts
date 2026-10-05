import { type Request, type Response, type NextFunction } from "express";
import Extra from "../../../models/Extra.ts";
import { extraArraySchema } from "../../../schemas/extra.response.schema.ts";

export async function getAllExtras(
  _req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const extras = await Extra.find().sort({ nameEng: 1 }).lean();
    const parsed = extraArraySchema.safeParse(extras);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getAllExtras controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
