import { z } from "zod";
import type { Request } from "express";
import { extraSimpleSchema } from "../../../schemas/extra.response.schema.ts";

export const UpdateExtraRequestSchema = {
  body: extraSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateExtraRequest = Request<
  z.infer<typeof UpdateExtraRequestSchema.params>,
  {},
  z.infer<typeof UpdateExtraRequestSchema.body>,
  z.infer<typeof UpdateExtraRequestSchema.query>
>;
