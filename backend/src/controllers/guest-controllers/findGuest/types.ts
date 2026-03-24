import { z } from "zod";
import type { Request } from "express";

export const FindGuestRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({
    personalID: z.coerce.string().optional(),
    email: z.coerce.string().optional(),
  }),
  params: z.object({}),
};

export type FindGuestRequest = Request<
  z.infer<typeof FindGuestRequestSchema.params>,
  {},
  z.infer<typeof FindGuestRequestSchema.body>,
  z.infer<typeof FindGuestRequestSchema.query>
>;
