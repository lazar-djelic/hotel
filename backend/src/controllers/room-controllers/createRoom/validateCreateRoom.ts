import { type Request, type Response, type NextFunction } from "express";
import { ZodError, type ZodType } from "zod";
import Room from "../../../models/Room.ts";

export const validateCreateRoom =
  (schema: ZodType<unknown>) =>
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(res.locals.data);
      const room = new Room(parsed);
      await room.save();
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("DB response validation failed", error);
        return res
          .status(500)
          .json({ message: "Invalid data shape from database" });
      }

      console.error(
        "Error in validateCreateRoom middleware, specifically saving room.",
        error,
      );
      res.status(500).json({ message: "Internal server error" });
    }
  };
