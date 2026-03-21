import { z } from "zod";
import type { Request } from "express";
import { staySimpleSchema } from "../../../schemas/stay.response.schema.ts";

export const CreateStayRequestSchema = {
  body: staySimpleSchema,
  query: z.object({}),
  params: z.object({}),
};

export type CreateStayRequest = Request<
  z.infer<typeof CreateStayRequestSchema.params>,
  {},
  z.infer<typeof CreateStayRequestSchema.body>,
  z.infer<typeof CreateStayRequestSchema.query>
>;
