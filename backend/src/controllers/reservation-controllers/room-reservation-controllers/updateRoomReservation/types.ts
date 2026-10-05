import { z } from "zod";
import type { Request } from "express";
import { updateRoomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";

export const UpdateRoomReservationRequestSchema = {
  body: updateRoomReservationSimpleSchema,
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
