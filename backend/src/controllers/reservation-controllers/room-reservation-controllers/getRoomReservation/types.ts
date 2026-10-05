import { z } from "zod";
import type { Request, Response } from "express";

export const GetRoomReservationRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetRoomReservationRequest = Request<
  z.infer<typeof GetRoomReservationRequestSchema.params>,
  {},
  z.infer<typeof GetRoomReservationRequestSchema.body>,
  z.infer<typeof GetRoomReservationRequestSchema.query>
>;
