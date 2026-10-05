import { z } from "zod";
import type { Request } from "express";
import { extraSimpleSchema } from "../../../schemas/extra.response.schema.ts";

export const CreateExtraRequestSchema = {
  body: extraSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateExtraRequest = Request<
  z.infer<typeof CreateExtraRequestSchema.params>,
  {},
  z.infer<typeof CreateExtraRequestSchema.body>,
  z.infer<typeof CreateExtraRequestSchema.query>
>;
