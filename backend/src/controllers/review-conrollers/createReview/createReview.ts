import Review from "../../../models/Review.ts";
import { type Response, type NextFunction } from "express";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema.ts";
import type { CreateReviewRequest } from "./types.ts";
import { USER_ROLE } from "../../../utils/enums.ts";

export async function createReview(
  req: CreateReviewRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.session.role === USER_ROLE.guest && !req.session.guest) {
      return res.status(400).json({
        message: "Cannot create review without personal information.",
      });
    }

    const parsed = reviewSimpleSchema.safeParse(req.body);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    const guest = req.session.guest;
    const { opinion, rating } = req.body;
    const review = new Review({ guest, opinion, rating });
    const newReview = await review.save();
    res.status(200).json(newReview);
  } catch (error) {
    console.error("Error in createReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
