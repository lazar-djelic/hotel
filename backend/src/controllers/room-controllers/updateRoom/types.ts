import { z } from "zod";
import type { Request } from "express";
import { roomSimpleSchema } from "../../../schemas/room.response.schema.ts";

export const UpdateRoomRequestSchema = {
  body: roomSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type UpdateRoomRequest = Request<
  z.infer<typeof UpdateRoomRequestSchema.params>,
  {},
  z.infer<typeof UpdateRoomRequestSchema.body>,
  z.infer<typeof UpdateRoomRequestSchema.query>
>;
