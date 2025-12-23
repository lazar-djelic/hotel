import express from "express";
import { getAllReviews } from "../controllers/review-conrollers/getReviews/getAllReviews.ts";
import { getReviewById } from "../controllers/review-conrollers/getReview/getReviewById.ts";
import { createReview } from "../controllers/review-conrollers/createReview/createReview.ts";
import { updateReview } from "../controllers/review-conrollers/updateReview/updateReview.ts";
import { deleteReview } from "../controllers/review-conrollers/deleteReview/deleteReview.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { GetReviewsRequestSchema } from "../controllers/review-conrollers/getReviews/types.ts";
import { GetReviewRequestSchema } from "../controllers/review-conrollers/getReview/type.ts";
import { CreateReviewRequestSchema } from "../controllers/review-conrollers/createReview/type.ts";
import { UpdateReviewRequestSchema } from "../controllers/review-conrollers/updateReview/type.ts";
import { DeleteReviewRequestSchema } from "../controllers/review-conrollers/deleteReview/type.ts";

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
