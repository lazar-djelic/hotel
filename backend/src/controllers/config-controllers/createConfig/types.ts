import { z } from "zod";
import type { Request } from "express";

export const CreateConfigRequestSchema = {
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

export type CreateConfigRequest = Request<
  z.infer<typeof CreateConfigRequestSchema.params>,
  {},
  z.infer<typeof CreateConfigRequestSchema.body>,
  z.infer<typeof CreateConfigRequestSchema.query>
>;
