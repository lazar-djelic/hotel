import { z } from "zod";
import type { Request } from "express";

export const GetRoomReservationsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
  params: z.object({}),
};

export type GetRoomReservationsRequest = Request<
  z.infer<typeof GetRoomReservationsRequestSchema.params>,
  {},
  z.infer<typeof GetRoomReservationsRequestSchema.body>,
  z.infer<typeof GetRoomReservationsRequestSchema.query>
>;
