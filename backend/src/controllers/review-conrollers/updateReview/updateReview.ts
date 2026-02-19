import Review from "../../../models/Review.ts";
import { type Response, type NextFunction } from "express";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema.ts";
import type { UpdateReviewRequest } from "./types.ts";

export async function updateReview(
  req: UpdateReviewRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { guest, opinion, rating } = req.body;
    const review = new Review({ guest, opinion, rating });
    const parsed = reviewSimpleSchema.parse(review);

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { guest, opinion, rating },
      {
        new: true,
      },
    );

    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error in updateReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
