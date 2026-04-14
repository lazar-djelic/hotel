import { z } from "zod";
import type { Request } from "express";
import { taxesSimpleSchema } from "../../../schemas/taxes.schema.ts";

export const CreateTaxesRequestSchema = {
  body: taxesSimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateTaxesRequest = Request<
  z.infer<typeof CreateTaxesRequestSchema.params>,
  {},
  z.infer<typeof CreateTaxesRequestSchema.body>,
  z.infer<typeof CreateTaxesRequestSchema.query>
>;
