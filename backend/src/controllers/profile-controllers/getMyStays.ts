import type { Request, Response, NextFunction } from "express";
import { USER_ROLE } from "../../utils/enums.ts";
import { Stay } from "../../models/Stay.ts";
import { getStayArraySchema } from "../../schemas/stay.response.schema.ts";

export async function getMyStays(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.session.role === USER_ROLE.guest && !req.session.guest) {
      return res.status(400).json({
        message: "User didn't enter personal data.",
      });
    }

    const guest = req.session.guest;

    const stays = await Stay.find({ guest })
      .populate("room")
      .sort({ createdAt: -1 })
      .lean();

    if (!stays) {
      return res.status(400).json({
        message: "User doesn't have any stays.",
      });
    }

    const parsed = getStayArraySchema.safeParse(stays);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getMyStays controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
