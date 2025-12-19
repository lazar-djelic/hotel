import Review from "../models/Review.ts";
import { type Request, type Response } from "express";

export async function getAllReviews(_: Request, res: Response) {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error in getAllReviews controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getReviewById(req: Request, res: Response) {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) return res.status(404).json({ message: "Review not found" });
    res.status(200).json(review);
  } catch (error) {
    console.error("Error in getReviewById controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createReview(req: Request, res: Response) {
  try {
    const { guest, opinion } = req.body;
    const review = new Review({ guest, opinion });
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (error) {
    console.error("Error in createReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateReview(req: Request, res: Response) {
  try {
    const { guest, opinion } = req.body;
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      { guest, opinion },
      {
        new: true,
      }
    );
    if (!updatedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error in updateReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const deletedReview = await Review.findByIdAndDelete(req.params.id);
    if (!deletedReview)
      return res.status(404).json({ message: "Review not found" });
    res.status(200).json({ message: "Review deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteReview controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
