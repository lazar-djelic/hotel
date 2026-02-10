import { z } from "zod";
import type { Request } from "express";

export const CreateRoomRequestSchema = {
  body: z.object({
    floor: z.number(),
    roomnum: z.number(),
    type: z.string(),
    bednum: z.string(),
    smoking: z.boolean(),
    accessibility: z.boolean(),
    view: z.string(),
    balcony: z.boolean(),
    status: z.string(),
    housekeeping: z.string(),
    lastcleaned: z.string(),
    linkedroom: z.boolean(),
    pets: z.boolean(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type CreateRoomRequest = Request<
  z.infer<typeof CreateRoomRequestSchema.params>,
  {},
  z.infer<typeof CreateRoomRequestSchema.body>,
  z.infer<typeof CreateRoomRequestSchema.query>
>;
