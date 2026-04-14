import { z } from "zod";
import type { Request } from "express";

export const GetExtraRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetExtraRequest = Request<
  z.infer<typeof GetExtraRequestSchema.params>,
  {},
  z.infer<typeof GetExtraRequestSchema.body>,
  z.infer<typeof GetExtraRequestSchema.query>
>;
