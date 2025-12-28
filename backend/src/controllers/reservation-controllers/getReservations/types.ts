import { z } from "zod";
import type { Request } from "express";

export const GetReservationsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
  params: z.object({}),
};

export type GetReservationsRequest = Request<
  z.infer<typeof GetReservationsRequestSchema.params>,
  {},
  z.infer<typeof GetReservationsRequestSchema.body>,
  z.infer<typeof GetReservationsRequestSchema.query>
>;
