import { z } from "zod";
import type { Request } from "express";
import { reviewSimpleSchema } from "../../../schemas/review.response.schema.ts";

export const CreateReviewRequestSchema = {
  body: reviewSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateReviewRequest = Request<
  z.infer<typeof CreateReviewRequestSchema.params>,
  {},
  z.infer<typeof CreateReviewRequestSchema.body>,
  z.infer<typeof CreateReviewRequestSchema.query>
>;
