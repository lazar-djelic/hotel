import { z } from "zod";
import type { Request } from "express";

export const GetGuestRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetGuestRequest = Request<
  z.infer<typeof GetGuestRequestSchema.params>,
  {},
  z.infer<typeof GetGuestRequestSchema.body>,
  z.infer<typeof GetGuestRequestSchema.query>
>;
