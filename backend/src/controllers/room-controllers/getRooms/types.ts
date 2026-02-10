import { z } from "zod";
import type { Request } from "express";

export const GetRoomsRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type GetRoomsRequst = Request<
  z.infer<typeof GetRoomsRequestSchema.params>,
  {},
  z.infer<typeof GetRoomsRequestSchema.body>,
  z.infer<typeof GetRoomsRequestSchema.query>
>;
