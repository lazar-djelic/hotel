import { z } from "zod";
import type { Request } from "express";

export const UpdateRoomRequestSchema = {
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
