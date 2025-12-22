import { z } from "zod";

export const reviewSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: z.string(),
  opinion: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const reviewArraySchema = z.array(reviewSchema);

export const reviewSimpleSchema = z.object({
  guest: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be less than 100 characters"),
  opinion: z
    .string()
    .min(1, "Review is required")
    .max(1000, "Review must be less than 1000 characters"),
});

export type reviewSimpleSchemaType = z.infer<typeof reviewSimpleSchema>;
