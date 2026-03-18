import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { getAllReviews } from "../controllers/review-conrollers/getReviews/getAllReviews.ts";
import { getReviewById } from "../controllers/review-conrollers/getReview/getReviewById.ts";
import { createReview } from "../controllers/review-conrollers/createReview/createReview.ts";
import { updateReview } from "../controllers/review-conrollers/updateReview/updateReview.ts";
import { deleteReview } from "../controllers/review-conrollers/deleteReview/deleteReview.ts";
import { GetReviewsRequestSchema } from "../controllers/review-conrollers/getReviews/types.ts";
import {
  GetReviewRequestSchema,
  type GetReviewRequest,
} from "../controllers/review-conrollers/getReview/types.ts";
import {
  CreateReviewRequestSchema,
  type CreateReviewRequest,
} from "../controllers/review-conrollers/createReview/types.ts";
import {
  UpdateReviewRequestSchema,
  type UpdateReviewRequest,
} from "../controllers/review-conrollers/updateReview/types.ts";
import {
  DeleteReviewRequestSchema,
  type DeleteReviewRequest,
} from "../controllers/review-conrollers/deleteReview/types.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/roleEnums.ts";

const router = express.Router();

router.route("/").get(validateRequest(GetReviewsRequestSchema), getAllReviews);

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetReviewRequest>([USER_ROLE.guest, USER_ROLE.admin]),
    validateRequest(GetReviewRequestSchema),
    getReviewById,
  );

router
  .route("/")
  .post(
    authenAndAuthorize<CreateReviewRequest>([USER_ROLE.guest]),
    validateRequest(CreateReviewRequestSchema),
    createReview,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateReviewRequest>([USER_ROLE.guest]),
    validateRequest(UpdateReviewRequestSchema),
    updateReview,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteReviewRequest>([USER_ROLE.guest, USER_ROLE.admin]),
    validateRequest(DeleteReviewRequestSchema),
    deleteReview,
  );

export default router;
