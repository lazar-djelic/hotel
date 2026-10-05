import { z } from "zod";
import type { Request } from "express";

export const GetAmenityReservationsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
  params: z.object({}),
};

export type GetAmenityReservationsRequest = Request<
  z.infer<typeof GetAmenityReservationsRequestSchema.params>,
  {},
  z.infer<typeof GetAmenityReservationsRequestSchema.body>,
  z.infer<typeof GetAmenityReservationsRequestSchema.query>
>;
