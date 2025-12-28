import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { getAllReviews } from "../controllers/review-conrollers/getReviews/getAllReviews.ts";
import { getReviewById } from "../controllers/review-conrollers/getReview/getReviewById.ts";
import { createReview } from "../controllers/review-conrollers/createReview/createReview.ts";
import { updateReview } from "../controllers/review-conrollers/updateReview/updateReview.ts";
import { deleteReview } from "../controllers/review-conrollers/deleteReview/deleteReview.ts";
import { GetReviewsRequestSchema } from "../controllers/review-conrollers/getReviews/types.ts";
import { GetReviewRequestSchema } from "../controllers/review-conrollers/getReview/types.ts";
import { CreateReviewRequestSchema } from "../controllers/review-conrollers/createReview/types.ts";
import { UpdateReviewRequestSchema } from "../controllers/review-conrollers/updateReview/types.ts";
import { DeleteReviewRequestSchema } from "../controllers/review-conrollers/deleteReview/types.ts";

const router = express.Router();

router.route("/").get(validateRequest(GetReviewsRequestSchema), getAllReviews);
router
  .route("/:id")
  .get(validateRequest(GetReviewRequestSchema), getReviewById);
router
  .route("/")
  .post(validateRequest(CreateReviewRequestSchema), createReview);
router
  .route("/:id")
  .put(validateRequest(UpdateReviewRequestSchema), updateReview);

router
  .route("/:id")
  .delete(validateRequest(DeleteReviewRequestSchema), deleteReview);

export default router;
