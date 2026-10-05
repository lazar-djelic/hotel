import { z } from "zod";
import type { Request } from "express";
import { roomSimpleSchema } from "../../../schemas/room.response.schema.ts";

export const CreateRoomRequestSchema = {
  body: roomSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateRoomRequest = Request<
  z.infer<typeof CreateRoomRequestSchema.params>,
  {},
  z.infer<typeof CreateRoomRequestSchema.body>,
  z.infer<typeof CreateRoomRequestSchema.query>
>;
