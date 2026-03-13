import { z } from "zod";
import type { Request } from "express";

export const DeleteGuestRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteGuestRequest = Request<
  z.infer<typeof DeleteGuestRequestSchema.params>,
  {},
  z.infer<typeof DeleteGuestRequestSchema.body>,
  z.infer<typeof DeleteGuestRequestSchema.query>
>;
