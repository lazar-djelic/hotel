import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type ZodType } from "zod";
import Review from "../../models/Review.ts";

export const validateCreateReview =
  (schema: ZodType<unknown>) =>
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(res.locals.data);
      const review = new Review(parsed);
      await review.save();
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("DB response validation failed", error);
        return res
          .status(500)
          .json({ message: "Invalid data shape from database" });
      }

      console.error(
        "Error in validateCreateReview middleware, specifically saving review.",
        error
      );
      res.status(500).json({ message: "Internal server error" });
    }
  };
