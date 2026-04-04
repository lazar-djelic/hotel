import { z } from "zod";
import type { getStay, Stay } from "../types/StayType";
import { guestSchema } from "./guest.response.schema";
import { getRoomReservationSchema } from "./roomReservation.response.schema";
import { getRoomSchema } from "./room.response.schema";
import { CURRENCIES, STAY_STATUS } from "../config/enums";

export const staySchema: z.ZodType<Stay> = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: z.lazy(() => guestSchema),
  reservation: z.lazy(() => getRoomReservationSchema).nullable(),
  room: z.lazy(() => getRoomSchema),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date().nullable(),
  stStatus: z.enum([
    STAY_STATUS.checked_in,
    STAY_STATUS.checked_out,
    STAY_STATUS.cancelled,
    STAY_STATUS.no_show,
  ]),
  adults: z.number(),
  children: z.number(),
  rate: z.number(),
  currency: z.enum([CURRENCIES.rsd, CURRENCIES.eur]),
  extras: z.array(
    z.object({
      type: z.string(),
      amount: z.number(),
    }),
  ),
  notes: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
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
  adults: z.number().optional(),
  children: z.number().optional(),
  notes: z.string().optional(),
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
  stStatus: z.enum([
    STAY_STATUS.checked_in,
    STAY_STATUS.checked_out,
    STAY_STATUS.cancelled,
    STAY_STATUS.no_show,
  ]),
  adults: z.number().nullable().optional(),
  children: z.number().nullable().optional(),
  rate: z.number().nullable().optional(),
  currency: z.enum([CURRENCIES.rsd, CURRENCIES.eur]).nullable().optional(),
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

export const getStaySchema: z.ZodType<getStay> = z.object({
  _id: z.any().transform((val) => val.toString()),
  guest: z.any().transform((val) => val.toString()),
  reservation: z
    .any()
    .transform((val) => val.toString())
    .nullable(),
  room: z.lazy(() => getRoomSchema),
  checkIn: z.coerce.date(),
  checkOut: z.coerce.date().nullable(),
  stStatus: z.enum([
    STAY_STATUS.checked_in,
    STAY_STATUS.checked_out,
    STAY_STATUS.cancelled,
    STAY_STATUS.no_show,
  ]),
  adults: z.number(),
  children: z.number(),
  rate: z.number(),
  currency: z.enum([CURRENCIES.rsd, CURRENCIES.eur]),
  extras: z.array(
    z.object({
      type: z.string(),
      amount: z.number(),
    }),
  ),
  notes: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const getStayArraySchema = z.array(getStaySchema);
