import express from "express";
import { getAllReviews } from "../controllers/review-conrollers/getAllReviews.ts";
import { getReviewById } from "../controllers/review-conrollers/getReviewById.ts";
import { createReview } from "../controllers/review-conrollers/createReview.ts";
import { updateReview } from "../controllers/review-conrollers/updateReview.ts";
import { deleteReview } from "../controllers/review-conrollers/deleteReview.ts";
import { sendResponse } from "../middlewares/reviews/sendResponse.ts";
import { sendUpdateResponse } from "../middlewares/reviews/sendUpdateResponse.ts";
import { validateGetAllReviews } from "../middlewares/reviews/validateGetAllReviews.ts";
import { validateGetReviewById } from "../middlewares/reviews/validateGetReviewById.ts";
import { validateCreateReview } from "../middlewares/reviews/validateCreateReview.ts";
import { validateUpdateReview } from "../middlewares/reviews/validateUpdateReview.ts";
import {
  reviewArraySchema,
  reviewSimpleSchema,
  reviewSchema,
} from "../schemas/review.response.schema.ts";

const router = express.Router();

router.get(
  "/",
  getAllReviews,
  validateGetAllReviews(reviewArraySchema),
  sendResponse
);
router.get(
  "/:id",
  getReviewById,
  validateGetReviewById(reviewSchema),
  sendResponse
);
router.post(
  "/",
  createReview,
  validateCreateReview(reviewSimpleSchema),
  sendResponse
);
router.put(
  "/:id",
  updateReview,
  validateUpdateReview(reviewSimpleSchema),
  sendUpdateResponse
);
router.delete("/:id", deleteReview);

export default router;
