import express from "express";
import { createReview, deleteReview, getAllReviews, getReviewById, updateReview } from "../controllers/reviewsController.js";

const router = express.Router();

router.get("/", getAllReviews);
router.get("/:id", getReviewById);
router.post("/", createReview);
router.put("/:id", updateReview);
router.delete("/:id", deleteReview);

export default router;