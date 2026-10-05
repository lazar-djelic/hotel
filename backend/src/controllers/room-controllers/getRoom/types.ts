import { z } from "zod";
import type { Request, Response } from "express";

export const GetRoomRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetRoomRequest = Request<
  z.infer<typeof GetRoomRequestSchema.params>,
  {},
  z.infer<typeof GetRoomRequestSchema.body>,
  z.infer<typeof GetRoomRequestSchema.query>
>;
