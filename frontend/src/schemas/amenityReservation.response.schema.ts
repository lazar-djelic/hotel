import { z } from "zod";
import { roomSchema } from "./room.response.schema.ts";
import { guestSchema } from "./guest.response.schema.ts";
import { amenitySchema } from "./amenity.response.schema.ts";
import { AM_RES_STATUS } from "../config/enums.ts";
import { userSchema, userSimpleSchema } from "./user.response.schema.ts";

export const amenityReservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  amenity: amenitySchema,
  user: z
    .any()
    .nullable()
    .transform((val) => val?.toString() || null),
  guest: z.lazy(() => guestSchema),
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
  status: z.enum([
    AM_RES_STATUS.booked,
    AM_RES_STATUS.confirmed,
    AM_RES_STATUS.cancelled,
  ]),
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

export const userAndAmResRecSimpleSchema = z.object({
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
