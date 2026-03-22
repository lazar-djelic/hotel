import Review from "../../../models/Review.ts";
import { type Response, type NextFunction } from "express";
import { reviewArraySchema } from "../../../schemas/review.response.schema.ts";
import type { GetReviewsRequst } from "./types.ts";

export async function getAllReviews(
  _req: GetReviewsRequst,
  res: Response,
  next: NextFunction,
) {
  try {
    const reviews = await Review.find()
      .populate("guest")
      .sort({ createdAt: -1 })
      .lean();
    const parsed = reviewArraySchema.safeParse(reviews);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error in getAllReviews controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
