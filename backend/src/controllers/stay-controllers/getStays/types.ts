import { z } from "zod";
import type { Request } from "express";

export const GetStaysRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({
    startDate: z.coerce.date(),
    endDate: z.coerce.date(),
  }),
  params: z.object({}),
};

export type GetStaysRequest = Request<
  z.infer<typeof GetStaysRequestSchema.params>,
  {},
  z.infer<typeof GetStaysRequestSchema.body>,
  z.infer<typeof GetStaysRequestSchema.query>
>;
