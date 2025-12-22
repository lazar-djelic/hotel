import { z } from "zod";

export const reviewSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: z.string(),
  opinion: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const reviewArraySchema = z.array(reviewSchema);

export const reviewSimpleSchema = z.object({
  guest: z.string(),
  opinion: z.string(),
});
