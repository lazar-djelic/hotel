import { z } from "zod";
import type { Request } from "express";
import { roomReservationReceptionSimpleSchema } from "../../../../schemas/roomReservation.response.schema.ts";

export const CreateRoomReservationReceptionRequestSchema = {
  body: roomReservationReceptionSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateRoomReservationReceptionRequest = Request<
  z.infer<typeof CreateRoomReservationReceptionRequestSchema.params>,
  {},
  z.infer<typeof CreateRoomReservationReceptionRequestSchema.body>,
  z.infer<typeof CreateRoomReservationReceptionRequestSchema.query>
>;
