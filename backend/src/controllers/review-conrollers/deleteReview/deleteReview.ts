import Review from "../../../models/Review.ts";
import { type Response } from "express";
import type { DeleteReviewRequest } from "./types.ts";

export async function deleteReview(req: DeleteReviewRequest, res: Response) {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
