import { z } from "zod";
import type { Request } from "express";

export const GetReviewsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type GetReviewsRequst = Request<
  z.infer<typeof GetReviewsRequestSchema.params>,
  {},
  z.infer<typeof GetReviewsRequestSchema.body>,
  z.infer<typeof GetReviewsRequestSchema.query>
>;
