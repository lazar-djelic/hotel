import { z } from "zod";
import type { Request } from "express";

export const UpdateConfigRequestSchema = {
  body: z.object({
    levels: z.number(),
    room: z.boolean(),
    conference: z.boolean(),
    spa: z.boolean(),
    pool: z.boolean(),
    restaurant: z.boolean(),
    gym: z.boolean(),
    sauna: z.boolean(),
  }),
  query: z.object({}),
  params: z.object({}),
};

export type UpdateConfigRequest = Request<
  z.infer<typeof UpdateConfigRequestSchema.params>,
  {},
  z.infer<typeof UpdateConfigRequestSchema.body>,
  z.infer<typeof UpdateConfigRequestSchema.query>
>;
