import { z } from "zod";
import type { Request } from "express";

export const CreateRoomReservationRequestSchema = {
  body: z.object({
    guest: z.any().transform((val) => val.toString()),
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
    roomType: z.string(),
    bedNum: z.string(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type CreateRoomReservationRequest = Request<
  z.infer<typeof CreateRoomReservationRequestSchema.params>,
  {},
  z.infer<typeof CreateRoomReservationRequestSchema.body>,
  z.infer<typeof CreateRoomReservationRequestSchema.query>
>;
