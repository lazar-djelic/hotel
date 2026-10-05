import { z } from "zod";
import type { Request } from "express";
import { AM_RES_STATUS } from "../../../../utils/enums.ts";

export const CreateGuestAndAmenityResBodySchema = z.object({
  fName: z.string(),
  lName: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  personalID: z.string(),
  birthDate: z.coerce.date(),
  notes: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
});

export const CreateGuestAndAmenityResRequestSchema = {
  body: CreateGuestAndAmenityResBodySchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type CreateGuestAndAmenityResRequest = Request<
  z.infer<typeof CreateGuestAndAmenityResRequestSchema.params>,
  {},
  z.infer<typeof CreateGuestAndAmenityResRequestSchema.body>,
  z.infer<typeof CreateGuestAndAmenityResRequestSchema.query>
>;
