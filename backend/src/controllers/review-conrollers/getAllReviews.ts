import Review from "../../models/Review.ts";
import { type Request, type Response, type NextFunction } from "express";

export async function getAllReviews(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 }).lean();
    res.locals.data = reviews;
    next();
  } catch (error) {
    console.error("Error in getAllReviews controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
