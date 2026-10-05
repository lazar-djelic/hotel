import type { Request, Response, NextFunction } from "express";
import { USER_ROLE } from "../../utils/enums.ts";
import Review from "../../models/Review.ts";
import { getReviewSchema } from "../../schemas/review.response.schema.ts";

export async function getMyReview(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    if (req.session.role === USER_ROLE.guest && !req.session.guest) {
      return res.status(400).json({
        message: "User didn't enter personal data.",
      });
    }

    const guest = req.session.guest;

    const review = await Review.findOne({ guest });
    if (!review) {
      return res.status(400).json({
        message: "User doesn't have a review.",
      });
    }

    const parsed = getReviewSchema.safeParse(review);

    if (!parsed.success) {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: parsed.error.issues });
    }

    res.status(200).json(parsed.data);
  } catch (error) {
    console.error("Error in getMyReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
