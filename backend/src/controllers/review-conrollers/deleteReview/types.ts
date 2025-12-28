import { z } from "zod";
import type { Request } from "express";

export const DeleteReviewRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteReviewRequest = Request<
  z.infer<typeof DeleteReviewRequestSchema.params>,
  {},
  z.infer<typeof DeleteReviewRequestSchema.body>,
  z.infer<typeof DeleteReviewRequestSchema.query>
>;
