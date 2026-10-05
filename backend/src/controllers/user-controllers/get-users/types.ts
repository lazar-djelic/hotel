import { z } from "zod";
import type { Request } from "express";

export const GetUsersRequestSchema = {
  body: z.object({}).optional(),
  query: z.object({}),
  params: z.object({}),
};

export type GetUsersRequest = Request<
  z.infer<typeof GetUsersRequestSchema.params>,
  {},
  z.infer<typeof GetUsersRequestSchema.body>,
  z.infer<typeof GetUsersRequestSchema.query>
>;
