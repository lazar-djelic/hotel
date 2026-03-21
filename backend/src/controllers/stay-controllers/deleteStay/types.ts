import { z } from "zod";
import type { Request } from "express";

export const DeleteStayRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type DeleteStayRequest = Request<
  z.infer<typeof DeleteStayRequestSchema.params>,
  {},
  z.infer<typeof DeleteStayRequestSchema.body>,
  z.infer<typeof DeleteStayRequestSchema.query>
>;
