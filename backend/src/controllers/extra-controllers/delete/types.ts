import { z } from "zod";
import type { Request } from "express";

export const DeleteExtraRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteExtraRequest = Request<
  z.infer<typeof DeleteExtraRequestSchema.params>,
  {},
  z.infer<typeof DeleteExtraRequestSchema.body>,
  z.infer<typeof DeleteExtraRequestSchema.query>
>;
