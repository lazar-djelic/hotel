import { z } from "zod";
import type { Request } from "express";

export const GetConfigRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type GetConfigRequest = Request<
  z.infer<typeof GetConfigRequestSchema.params>,
  {},
  z.infer<typeof GetConfigRequestSchema.body>,
  z.infer<typeof GetConfigRequestSchema.query>
>;
