import { type Request, type Response } from "express";

export function sendUpdateResponse(_req: Request, res: Response) {
  const updatedReview = res.locals.data;

  if (!updatedReview)
    return res.status(404).json({ message: "Review not found" });
  res.status(200).json(updatedReview);
}
