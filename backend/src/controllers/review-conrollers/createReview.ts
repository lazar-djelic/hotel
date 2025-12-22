import Review from "../../models/Review.ts";
import { type Request, type Response, type NextFunction } from "express";

export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { guest, opinion } = req.body;
    const review = new Review({ guest, opinion });
    res.locals.data = review;
    next();
  } catch (error) {
    console.error("Error in createReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
