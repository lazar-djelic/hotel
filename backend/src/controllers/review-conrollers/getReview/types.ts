import { z } from "zod";
import type { Request, Response } from "express";

export const GetReviewRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetReviewRequest = Request<
  z.infer<typeof GetReviewRequestSchema.params>,
  {},
  z.infer<typeof GetReviewRequestSchema.body>,
  z.infer<typeof GetReviewRequestSchema.query>
>;
