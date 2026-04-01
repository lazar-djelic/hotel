import { z } from "zod";
import type { Request } from "express";

export const checkouSimpleSchema = z.object({
  notes: z.string().optional(),
});

export const CheckOutRequestSchema = {
  body: checkouSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type CheckOutRequest = Request<
  z.infer<typeof CheckOutRequestSchema.params>,
  {},
  z.infer<typeof CheckOutRequestSchema.body>,
  z.infer<typeof CheckOutRequestSchema.query>
>;
