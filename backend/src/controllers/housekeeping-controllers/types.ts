import { z } from "zod";
import type { Request } from "express";
import { HOUSEKEEPING_OPTIONS } from "../../utils/enums.ts";

export const housekeepingSimpleSchema = z.object({
  housekeeping: z.enum([
    HOUSEKEEPING_OPTIONS.clean,
    HOUSEKEEPING_OPTIONS.dirty,
    HOUSEKEEPING_OPTIONS.in_progress,
    HOUSEKEEPING_OPTIONS.inspected,
  ]),
});

export const housekeepingRequestSchema = {
  body: housekeepingSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type housekeepingRequest = Request<
  z.infer<typeof housekeepingRequestSchema.params>,
  {},
  z.infer<typeof housekeepingRequestSchema.body>,
  z.infer<typeof housekeepingRequestSchema.query>
>;
