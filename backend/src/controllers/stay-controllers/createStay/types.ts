import { z } from "zod";
import type { Request } from "express";
import { createStaySimpleSchema } from "../../../schemas/stay.response.schema.ts";

export const CreateStayRequestSchema = {
  body: createStaySimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateStayRequest = Request<
  z.infer<typeof CreateStayRequestSchema.params>,
  {},
  z.infer<typeof CreateStayRequestSchema.body>,
  z.infer<typeof CreateStayRequestSchema.query>
>;
