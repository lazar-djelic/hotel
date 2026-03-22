import { z } from "zod";
import type { Request } from "express";
import { guestSimpleSchema } from "../../../schemas/guest.response.schema.ts";

export const UpdateGuestRequestSchema = {
  body: guestSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateGuestRequest = Request<
  z.infer<typeof UpdateGuestRequestSchema.params>,
  {},
  z.infer<typeof UpdateGuestRequestSchema.body>,
  z.infer<typeof UpdateGuestRequestSchema.query>
>;
