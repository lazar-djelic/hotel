import Review from "../../../models/Review.ts";
import { type Response, type NextFunction } from "express";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema.ts";
import type { CreateReviewRequest } from "./types.ts";

export async function createReview(
  req: CreateReviewRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const guest = req.session.guest;
    const { opinion, rating } = req.body;
    const review = new Review({ guest, opinion, rating });
    const parsed = reviewSimpleSchema.parse(review);
    await review.save();
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in createReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
