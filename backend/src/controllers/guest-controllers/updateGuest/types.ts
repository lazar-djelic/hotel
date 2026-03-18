import { z } from "zod";
import type { Request } from "express";

export const UpdateGuestRequestSchema = {
  body: z.object({
    fName: z.string(),
    lName: z.string(),
    phone: z.string(),
    email: z.string(),
    address: z.string(),
    personalID: z.string(),
    birthDate: z.string(),
    notes: z.string(),
  }),
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
