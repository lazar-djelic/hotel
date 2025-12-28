import { z } from "zod";
import type { Request } from "express";

export const CreateReservationRequestSchema = {
  body: z.object({
    fName: z.string(),
    lName: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    room: z.number(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type CreateReservationRequest = Request<
  z.infer<typeof CreateReservationRequestSchema.params>,
  {},
  z.infer<typeof CreateReservationRequestSchema.body>,
  z.infer<typeof CreateReservationRequestSchema.query>
>;
