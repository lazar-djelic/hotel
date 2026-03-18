import Review from "../../../models/Review.ts";
import { type Response } from "express";
import type { DeleteReviewRequest } from "./types.ts";
import { USER_ROLE } from "../../../utils/roleEnums.ts";

export async function deleteReview(req: DeleteReviewRequest, res: Response) {
  try {
    const filter: any = { _id: req.params.id };

    if (req.session.role === USER_ROLE.guest) {
      filter.guest = req.session.guest;
    }

    const deletedReview = await Review.findOneAndDelete(filter);
    if (!deletedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
