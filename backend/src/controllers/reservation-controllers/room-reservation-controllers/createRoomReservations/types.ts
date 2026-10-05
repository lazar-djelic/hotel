import { z } from "zod";
import type { Request } from "express";
import { roomReservationSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";

export const CreateRoomReservationRequestSchema = {
  body: roomReservationSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateRoomReservationRequest = Request<
  z.infer<typeof CreateRoomReservationRequestSchema.params>,
  {},
  z.infer<typeof CreateRoomReservationRequestSchema.body>,
  z.infer<typeof CreateRoomReservationRequestSchema.query>
>;
