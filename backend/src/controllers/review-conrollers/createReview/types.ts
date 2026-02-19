import { z } from "zod";
import type { Request } from "express";

export const CreateReviewRequestSchema = {
  body: z.object({
    guest: z.string(),
    opinion: z.string(),
    rating: z.number(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type CreateReviewRequest = Request<
  z.infer<typeof CreateReviewRequestSchema.params>,
  {},
  z.infer<typeof CreateReviewRequestSchema.body>,
  z.infer<typeof CreateReviewRequestSchema.query>
>;
