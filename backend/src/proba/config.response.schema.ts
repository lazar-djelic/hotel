import { z } from "zod";

export const confSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  levels: z.number(),
});

export const confArraySchema = z.array(confSchema);

export const confSimpleSchema = z.object({
  levels: z.number(),
});
