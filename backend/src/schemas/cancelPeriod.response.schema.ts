import { z } from "zod";

export const cancelPeriodSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  hours: z.number(),
});

export const cancelPeriodSimpleSchema = z.object({
  hours: z.number(),
});
