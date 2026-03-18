import { z } from "zod";
import type { Request } from "express";

export const GetGuestsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type GetGuestsRequest = Request<
  z.infer<typeof GetGuestsRequestSchema.params>,
  {},
  z.infer<typeof GetGuestsRequestSchema.body>,
  z.infer<typeof GetGuestsRequestSchema.query>
>;
