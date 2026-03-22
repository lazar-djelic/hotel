import { z } from "zod";
import type { Request } from "express";
import { guestSimpleSchema } from "../../../schemas/guest.response.schema.ts";

export const CreateGuestRequestSchema = {
  body: guestSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateGuestRequest = Request<
  z.infer<typeof CreateGuestRequestSchema.params>,
  {},
  z.infer<typeof CreateGuestRequestSchema.body>,
  z.infer<typeof CreateGuestRequestSchema.query>
>;
