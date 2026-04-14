import { type Response, type NextFunction } from "express";
import { USER_ROLE } from "../../../utils/enums.ts";
import type { GetExtraRequest } from "./types.ts";
import Extra from "../../../models/Extra.ts";
import { extraSchema } from "../../../schemas/extra.response.schema.ts";

export async function getExtraById(
  req: GetExtraRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const extra = await Extra.findById(req.params.id);
    if (!extra) return res.status(404).json({ message: "Extra not found" });
    const parsed = extraSchema.safeParse(extra);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getExtraById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
