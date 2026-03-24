import { z } from "zod";
import type { Request } from "express";
import { AM_RES_STATUS, RESERVATION_STATUS } from "../../../../utils/enums.ts";

export const CreateAmenityReservationBodySchema = z.object({
  status: z.enum([
    AM_RES_STATUS.booked,
    AM_RES_STATUS.confirmed,
    AM_RES_STATUS.cancelled,
  ]),
  user: z
    .any()
    .transform((val) => val.toString())
    .nullable(),
  guest: z.string(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
});

export const CreateAmenityReservationRequestSchema = {
  body: CreateAmenityReservationBodySchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type CreateAmenityReservationRequest = Request<
  z.infer<typeof CreateAmenityReservationRequestSchema.params>,
  {},
  z.infer<typeof CreateAmenityReservationRequestSchema.body>,
  z.infer<typeof CreateAmenityReservationRequestSchema.query>
>;
