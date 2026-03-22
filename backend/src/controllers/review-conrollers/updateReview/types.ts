import { z } from "zod";
import type { Request } from "express";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema.ts";

export const UpdateReviewRequestSchema = {
  body: reviewSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateReviewRequest = Request<
  z.infer<typeof UpdateReviewRequestSchema.params>,
  {},
  z.infer<typeof UpdateReviewRequestSchema.body>,
  z.infer<typeof UpdateReviewRequestSchema.query>
>;
