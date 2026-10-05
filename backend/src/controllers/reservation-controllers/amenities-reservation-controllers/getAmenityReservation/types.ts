import { z } from "zod";
import type { Request, Response } from "express";

export const GetAmenityReservationRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetAmenityReservationRequest = Request<
  z.infer<typeof GetAmenityReservationRequestSchema.params>,
  {},
  z.infer<typeof GetAmenityReservationRequestSchema.body>,
  z.infer<typeof GetAmenityReservationRequestSchema.query>
>;
