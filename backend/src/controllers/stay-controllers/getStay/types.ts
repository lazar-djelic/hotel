import { z } from "zod";
import type { Request, Response } from "express";

export const GetStayRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetStayRequest = Request<
  z.infer<typeof GetStayRequestSchema.params>,
  {},
  z.infer<typeof GetStayRequestSchema.body>,
  z.infer<typeof GetStayRequestSchema.query>
>;
