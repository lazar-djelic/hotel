import { z } from "zod";
import type { Request } from "express";

export const GetRoomsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({
    room: z.coerce.number(),
  }),
  params: z.object({}),
};

export type GetRoomsRequest = Request<
  z.infer<typeof GetRoomsRequestSchema.params>,
  {},
  z.infer<typeof GetRoomsRequestSchema.body>,
  z.infer<typeof GetRoomsRequestSchema.query>
>;
