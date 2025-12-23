import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type ZodType } from "zod";

export const validateGetAllReviews =
  (schema: ZodType<unknown>) =>
  (_req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.data = schema.parse(res.locals.data);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("DB response validation failed", error);
        return res
          .status(500)
          .json({ message: "Invalid data shape from database" });
      }

      console.error(
        "Error in validateGetAllReviews middleware, specifically getting the reviews.",
        error
      );
      res.status(500).json({ message: "Internal server error" });
    }
  };
