import { z } from "zod";

export const slotsSchema = z.object({
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  available: z.boolean(),
  remainingCapacity: z.number(),
});

export const slotsArraySchema = z.array(slotsSchema);
