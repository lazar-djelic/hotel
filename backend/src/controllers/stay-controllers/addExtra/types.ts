import { z } from "zod";
import type { Request } from "express";

export const AddExtraSimpleSchema = z.object({
  type: z.string(),
  amount: z.number(),
});

export const AddExtraRequestSchema = {
  body: AddExtraSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type AddExtraRequest = Request<
  z.infer<typeof AddExtraRequestSchema.params>,
  {},
  z.infer<typeof AddExtraRequestSchema.body>,
  z.infer<typeof AddExtraRequestSchema.query>
>;
