import { z } from "zod";
import { guestSchema } from "./guest.response.schema.ts";
import { roomReservationSchema } from "./roomReservation.response.schema.ts";
import { roomSchema } from "./room.response.schema.ts";

export const staySchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: guestSchema,
  reservation: roomReservationSchema.nullable().optional(),
  room: roomSchema,
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date().nullable().optional(),
  stStatus: z.string(),
  adults: z.number().nullable().optional(),
  children: z.number().nullable().optional(),
  rate: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  extras: z
    .array(
      z.object({
        type: z.string(),
        amount: z.number(),
      }),
    )
    .optional(),
  notes: z.string().nullable().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const stayArraySchema = z.array(staySchema);

export const staySimpleSchema = z.object({
  guest: z.any().transform((val) => val.toString()),
  reservation: z
    .any()
    .nullable()
    .optional()
    .transform((val) => val?.toString()),
  room: z.any().transform((val) => val.toString()),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date().nullable().optional(),
  adults: z.number().nullable().optional(),
  children: z.number().nullable().optional(),
  rate: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  extras: z
    .array(
      z.object({
        type: z.string(),
        amount: z.number(),
      }),
    )
    .optional(),
  notes: z.string().nullable().optional(),
});

export const updateStaySimpleSchema = z.object({
  guest: z.any().transform((val) => val.toString()),
  reservation: z
    .any()
    .nullable()
    .optional()
    .transform((val) => val?.toString()),
  room: z.any().transform((val) => val.toString()),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date().nullable().optional(),
  stStatus: z.string(),
  adults: z.number().nullable().optional(),
  children: z.number().nullable().optional(),
  rate: z.number().nullable().optional(),
  currency: z.string().nullable().optional(),
  extras: z
    .array(
      z.object({
        type: z.string(),
        amount: z.number(),
      }),
    )
    .optional(),
  notes: z.string().nullable().optional(),
});
