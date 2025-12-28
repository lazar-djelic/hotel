import Review from "../../../models/Review.ts";
import { type Response, type NextFunction } from "express";
import { reviewSchema } from "../../../schemas/review.response.schema.ts";
import type { GetReviewRequest } from "./types.ts";

export async function getReviewById(
  req: GetReviewRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    const parsed = reviewSchema.parse(review);
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in getReviewById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
