import { z } from "zod";
import type { Request } from "express";
import { amenityReservationSimpleSchema } from "../../../../schemas/amenityReservation.response.schema.ts";

export const UpdateAmenityReservationReceptionRequestSchema = {
  body: amenityReservationSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateAmenityReservationReceptionRequest = Request<
  z.infer<typeof UpdateAmenityReservationReceptionRequestSchema.params>,
  {},
  z.infer<typeof UpdateAmenityReservationReceptionRequestSchema.body>,
  z.infer<typeof UpdateAmenityReservationReceptionRequestSchema.query>
>;
