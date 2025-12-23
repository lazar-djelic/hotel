import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type ZodType } from "zod";
import Review from "../../../models/Review.ts";

export const validateUpdateReview =
  (schema: ZodType<unknown>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(res.locals.data);
      const review = new Review(parsed);
      const guest = review.guest;
      const opinion = review.opinion;

      const updatedReview = await Review.findByIdAndUpdate(
        req.params.id,
        { guest, opinion },
        {
          new: true,
        }
      );

      res.locals.data = updatedReview;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("DB response validation failed", error);
        return res
          .status(500)
          .json({ message: "Invalid data shape from database" });
      }

      console.error(
        "Error in validateUpdateReview middleware, specifically updating review.",
        error
      );
      res.status(500).json({ message: "Internal server error" });
    }
  };
