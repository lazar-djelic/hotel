import { z } from "zod";

export const confSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  levels: z.number(),
});
