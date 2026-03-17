import { z } from "zod";
import { guestSchema } from "./guest.response.schema";

export const reservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: guestSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  roomType: z.string(),
  bedNum: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const reservationArraySchema = z.array(reservationSchema);

export const reservationSimpleSchema = z.object({
  guest: guestSchema,
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  roomType: z
    .string()
    .min(1, "Room type is required")
    .max(10, "Room type must be less than 10 characters"),
  bedNum: z
    .string()
    .min(1, "Number of beds is required")
    .max(10, "Number of beds must be less than 10 characters"),
});

export type reservationSimpleSchemaType = z.infer<
  typeof reservationSimpleSchema
>;
