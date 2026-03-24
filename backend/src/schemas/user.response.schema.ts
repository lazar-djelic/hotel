import { z } from "zod";
import { guestSchema } from "./guest.response.schema.ts";
import { USER_ROLE } from "../utils/enums.ts";

export const userSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  email: z.string(),
  password: z.string(),
  role: z.enum([
    USER_ROLE.admin,
    USER_ROLE.guest,
    USER_ROLE.housekeeping,
    USER_ROLE.receptionist,
  ]),
  guest: z.lazy(() => guestSchema).optional(),
});

export const userArraySchema = z.array(userSchema);

export const userSimpleSchema = z.object({
  email: z.string(),
  password: z.string(),
  role: z.enum([
    USER_ROLE.admin,
    USER_ROLE.guest,
    USER_ROLE.housekeeping,
    USER_ROLE.receptionist,
  ]),
  guest: guestSchema,
});
