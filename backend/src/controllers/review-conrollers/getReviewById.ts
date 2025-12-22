import Review from "../../models/Review.ts";
import { type Request, type Response, type NextFunction } from "express";

export async function getReviewById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.locals.data = review;
    next();
  } catch (error) {
    console.error("Error in getReviewById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
