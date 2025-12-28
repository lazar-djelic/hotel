import { z } from "zod";
import type { Request } from "express";

export const UpdateReviewRequestSchema = {
  body: z.object({
    guest: z.string(),
    opinion: z.string(),
  }),
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
