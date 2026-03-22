import { z } from "zod";
import { roomSchema } from "./room.response.schema.ts";
import { AM_RES_STATUS, RESERVATION_STATUS } from "../utils/enums.ts";
import { guestSchema } from "./guest.response.schema.ts";
import { amenitySchema } from "./amenity.response.schema.ts";

export const amenityReservationSchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  amenity: amenitySchema,
  guest: guestSchema,
  startTime: z.coerce.date(),
  endTime: z.coerce.date(),
  numberOfPeople: z.number().int().positive(),
  status: z.enum([
    AM_RES_STATUS.booked,
    AM_RES_STATUS.confirmed,
    AM_RES_STATUS.cancelled,
  ]),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const amenityReservationArraySchema = z.array(amenityReservationSchema);

export const amenityReservationSimpleSchema = z.object({
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

export const amenityReservationReceptionSimpleSchema = z.object({
  fName: z.string(),
  lName: z.string(),
  phone: z.string(),
  email: z.string(),
  address: z.string(),
  personalID: z.string(),
  birthDate: z.coerce.date(),
  notes: z.string().optional(),
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
