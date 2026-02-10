import { z } from "zod";
import type { Request } from "express";

export const DeleteRoomRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteRoomRequest = Request<
  z.infer<typeof DeleteRoomRequestSchema.params>,
  {},
  z.infer<typeof DeleteRoomRequestSchema.body>,
  z.infer<typeof DeleteRoomRequestSchema.query>
>;
