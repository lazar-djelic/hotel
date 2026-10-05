import { z } from "zod";
import type { Request } from "express";
import { amenityReservationSimpleSchema } from "../../../../schemas/amenityReservation.response.schema.ts";

export const UpdateAmenityReservationRequestSchema = {
  body: amenityReservationSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateAmenityReservationRequest = Request<
  z.infer<typeof UpdateAmenityReservationRequestSchema.params>,
  {},
  z.infer<typeof UpdateAmenityReservationRequestSchema.body>,
  z.infer<typeof UpdateAmenityReservationRequestSchema.query>
>;
