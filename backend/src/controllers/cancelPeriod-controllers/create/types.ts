import { z } from "zod";
import type { Request } from "express";
import { cancelPeriodSimpleSchema } from "../../../schemas/cancelPeriod.response.schema.ts";

export const CreateCancelPeriodRequestSchema = {
  body: cancelPeriodSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateCancelPeriodRequest = Request<
  z.infer<typeof CreateCancelPeriodRequestSchema.params>,
  {},
  z.infer<typeof CreateCancelPeriodRequestSchema.body>,
  z.infer<typeof CreateCancelPeriodRequestSchema.query>
>;
