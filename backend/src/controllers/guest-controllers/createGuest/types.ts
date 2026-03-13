import { z } from "zod";
import type { Request } from "express";

export const CreateGuestRequestSchema = {
  body: z.object({
    fName: z.string(),
    lName: z.string(),
    phone: z.number(),
    email: z.string(),
    address: z.string(),
    personalID: z.number(),
    birthDate: z.string(),
    notes: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type CreateGuestRequest = Request<
  z.infer<typeof CreateGuestRequestSchema.params>,
  {},
  z.infer<typeof CreateGuestRequestSchema.body>,
  z.infer<typeof CreateGuestRequestSchema.query>
>;
