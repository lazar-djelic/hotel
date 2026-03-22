import { z } from "zod";
import type { Request, Response } from "express";

export const GetAmenityRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type GetAmenityRequest = Request<
  z.infer<typeof GetAmenityRequestSchema.params>,
  {},
  z.infer<typeof GetAmenityRequestSchema.body>,
  z.infer<typeof GetAmenityRequestSchema.query>
>;
