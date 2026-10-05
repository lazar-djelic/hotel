import { type Response, type NextFunction } from "express";
import type { GetStayRequest } from "./types.ts";
import { Stay } from "../../../models/Stay.ts";
import { staySchema } from "../../../schemas/stay.response.schema.ts";

export async function getStayById(
  req: GetStayRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const stay = await Stay.findById(req.params.id)
      .populate("guest")
      .populate("reservation")
      .populate("room")
      .populate("extras.extra");

    if (!stay) return res.status(404).json({ message: "Stay not found" });

    const parsed = staySchema.safeParse(stay);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getStayById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
