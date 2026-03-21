import Review from "../../../models/Review.ts";
import { type Response, type NextFunction } from "express";
import { reviewSchema } from "../../../schemas/review.response.schema.ts";
import type { GetReviewRequest } from "./types.ts";
import { USER_ROLE } from "../../../utils/enums.ts";

export async function getReviewById(
  req: GetReviewRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const filter: any = { _id: req.params.id };

    if (req.session.role === USER_ROLE.guest) {
      filter.guest = req.session.guest;
    }

    const review = await Review.findOne(filter).populate("guest");
    if (!review) return res.status(404).json({ message: "Review not found" });
    const parsed = reviewSchema.parse(review);
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in getReviewById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
