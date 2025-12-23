import Review from "../../../models/Review.ts";
import { type Request, type Response, type NextFunction } from "express";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema.ts";

export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { guest, opinion } = req.body;
    const review = new Review({ guest, opinion });
    const parsed = reviewSimpleSchema.parse(review);
    await review.save();
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in createReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
