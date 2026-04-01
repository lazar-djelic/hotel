import { z } from "zod";
import type { Request } from "express";

export const GetStaysRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type GetStaysRequest = Request<
  z.infer<typeof GetStaysRequestSchema.params>,
  {},
  z.infer<typeof GetStaysRequestSchema.body>,
  z.infer<typeof GetStaysRequestSchema.query>
>;
