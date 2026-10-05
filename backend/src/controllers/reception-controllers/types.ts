import { z } from "zod";
import type { Request } from "express";

export const checkOutRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type checkOutRequest = Request<
  z.infer<typeof checkOutRequestSchema.params>,
  {},
  z.infer<typeof checkOutRequestSchema.body>,
  z.infer<typeof checkOutRequestSchema.query>
>;
