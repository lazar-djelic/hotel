import { z } from "zod";
import { guestSchema } from "./guest.response.schema";

export const reviewSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: guestSchema,
  opinion: z.string(),
  rating: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const reviewArraySchema = z.array(reviewSchema);

export const reviewSimpleSchema = z.object({
  opinion: z
    .string()
    .min(1, "Review is required")
    .max(1000, "Review must be less than 1000 characters"),
  rating: z
    .number()
    .min(1, "Rating must be greater than 1")
    .max(5, "Rating must be less than 5"),
});

export type reviewSimpleSchemaType = z.infer<typeof reviewSimpleSchema>;

export const getReviewSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: z.any().transform((val) => val.toString()),
  opinion: z.string(),
  rating: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
