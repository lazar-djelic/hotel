import { z } from "zod";
import type { Request } from "express";
import { USER_ROLE } from "../../utils/enums.ts";

export const roleSimpleSchema = z.object({
  role: z.enum([
    USER_ROLE.admin,
    USER_ROLE.guest,
    USER_ROLE.receptionist,
    USER_ROLE.staff,
  ]),
});

export const roleRequestSchema = {
  body: roleSimpleSchema,
  query: z.object({}),
  params: z.object({
    id: z.string(),
  }),
};

export type roleRequest = Request<
  z.infer<typeof roleRequestSchema.params>,
  {},
  z.infer<typeof roleRequestSchema.body>,
  z.infer<typeof roleRequestSchema.query>
>;
