import Review from "../../../models/Review.ts";
import { type Request, type Response } from "express";

export async function deleteReview(req: Request, res: Response) {
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
