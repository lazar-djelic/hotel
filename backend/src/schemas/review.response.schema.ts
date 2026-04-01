import { z } from "zod";
import { guestSchema } from "./guest.response.schema.ts";

export const reviewSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: guestSchema,
  opinion: z.string(),
  rating: z.number(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const reviewArraySchema = z.array(reviewSchema);

export const reviewSimpleSchema = z.object({
  opinion: z.string(),
  rating: z.number(),
});
