import Review from "../../../models/Review.ts";
import { type Request, type Response, type NextFunction } from "express";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema.ts";

export async function updateReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { guest, opinion } = req.body;
    const review = new Review({ guest, opinion });
    const parsed = reviewSimpleSchema.parse(review);

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { guest, opinion },
      {
        new: true,
      }
    );

    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error in updateReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
