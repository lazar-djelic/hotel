import { z } from "zod";
import {
  AM_RES_STATUS,
  CURRENCIES,
  RESERVATION_STATUS,
} from "../utils/enums.ts";
import { guestSchema } from "./guest.response.schema.ts";
import { amenitySchema } from "./amenity.response.schema.ts";

export const amenityReservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  amenity: amenitySchema,
  user: z
    .any()
    .nullable()
    .transform((val) => val?.toString() || null),
  guest: guestSchema.optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
  status: z.enum([
    AM_RES_STATUS.booked,
    AM_RES_STATUS.confirmed,
    AM_RES_STATUS.cancelled,
  ]),
  rate: z.number(),
  currency: z.enum([CURRENCIES.eur, CURRENCIES.rsd]),
  paid: z.boolean(),
  paidDate: z.coerce.date().optional(),
  paymentIntentId: z.string().optional(),
  checkoutSessionId: z.string().optional(),
  refunded: z.boolean().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const amenityReservationArraySchema = z.array(amenityReservationSchema);

export const amenityReservationSimpleSchema = z.object({
  amenity: z.any().transform((val) => val.toString()),
  user: z
    .any()
    .nullable()
    .transform((val) => val?.toString() || null),
  guest: z.any().transform((val) => val.toString()),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
  status: z.enum([
    AM_RES_STATUS.booked,
    AM_RES_STATUS.confirmed,
    AM_RES_STATUS.cancelled,
  ]),
});

export const userAndAmenityResRecSimpleSchema = z.object({
  fName: z.string(),
  lName: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  personalID: z.string(),
  birthDate: z.coerce.date(),
  notes: z.string().optional(),
  amenity: z.any().transform((val) => val.toString()),
  user: z
    .any()
    .nullable()
    .transform((val) => val?.toString() || null),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
  status: z.enum([
    AM_RES_STATUS.booked,
    AM_RES_STATUS.confirmed,
    AM_RES_STATUS.cancelled,
  ]),
});

export const getAmenityReservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  amenity: amenitySchema,
  user: z
    .any()
    .nullable()
    .transform((val) => val?.toString() || null),
  guest: z
    .any()
    .transform((val) => val.toString())
    .optional(),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
  status: z.enum([
    AM_RES_STATUS.booked,
    AM_RES_STATUS.confirmed,
    AM_RES_STATUS.cancelled,
  ]),
  rate: z.number(),
  currency: z.enum([CURRENCIES.eur, CURRENCIES.rsd]),
  paid: z.boolean(),
  paidDate: z.coerce.date().optional(),
  paymentIntentId: z.string().optional(),
  checkoutSessionId: z.string().optional(),
  refunded: z.boolean().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const getAmenityReservationArraySchema = z.array(
  getAmenityReservationSchema,
);
