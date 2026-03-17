import { z } from "zod";
import type { Request } from "express";

export const UpdateRoomReservationRequestSchema = {
  body: z.object({
    guest: z.any().transform((val) => val.toString()),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    roomType: z.string(),
    bedNum: z.string(),
  }),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateRoomReservationRequest = Request<
  z.infer<typeof UpdateRoomReservationRequestSchema.params>,
  {},
  z.infer<typeof UpdateRoomReservationRequestSchema.body>,
  z.infer<typeof UpdateRoomReservationRequestSchema.query>
>;
