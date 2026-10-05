import { z } from "zod";
import type { Request } from "express";

export const DeleteRoomReservationRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteRoomReservationRequest = Request<
  z.infer<typeof DeleteRoomReservationRequestSchema.params>,
  {},
  z.infer<typeof DeleteRoomReservationRequestSchema.body>,
  z.infer<typeof DeleteRoomReservationRequestSchema.query>
>;
