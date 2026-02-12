import { z } from "zod";

export const confSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  levels: z.number(),
  room: z.boolean(),
  conference: z.boolean(),
  spa: z.boolean(),
  pool: z.boolean(),
  restaurant: z.boolean(),
  gym: z.boolean(),
  sauna: z.boolean(),
});
