import { z } from "zod";
import type { Request } from "express";

export const DeleteAmenityReservationRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteAmenityReservationRequest = Request<
  z.infer<typeof DeleteAmenityReservationRequestSchema.params>,
  {},
  z.infer<typeof DeleteAmenityReservationRequestSchema.body>,
  z.infer<typeof DeleteAmenityReservationRequestSchema.query>
>;
