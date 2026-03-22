import { z } from "zod";
import type { Request, Response } from "express";

export const GetAmenitySlotsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({
    date: z.string(),
  }),
  params: z.object({
    id: z.string(),
  }),
};

export type GetAmenitySlotsRequest = Request<
  z.infer<typeof GetAmenitySlotsRequestSchema.params>,
  {},
  z.infer<typeof GetAmenitySlotsRequestSchema.body>,
  z.infer<typeof GetAmenitySlotsRequestSchema.query>
>;
