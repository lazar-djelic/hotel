import { z } from "zod";
import { AMENITY_TYPES, CURRENCIES } from "../utils/enums.ts";

export const amenitySchema = z.object({
  _id: z.any().transform((val) => val.toString()),
  name: z.string(),
  type: z.enum([
    AMENITY_TYPES.conference,
    AMENITY_TYPES.spa,
    AMENITY_TYPES.pool,
    AMENITY_TYPES.restaurant,
    AMENITY_TYPES.gym,
    AMENITY_TYPES.sauna,
  ]),
  capacity: z.number(),
  slotDuration: z.number(),
  openTime: z.string(),
  closeTime: z.string(),
  requiresReservation: z.boolean(),
  onePerSlot: z.boolean(),
  price: z.number(),
  currency: z.enum([CURRENCIES.eur, CURRENCIES.rsd]),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export const amenityArraySchema = z.array(amenitySchema);

export const amenitySimpleSchema = z.object({
  name: z.string(),
  type: z.enum([
    AMENITY_TYPES.conference,
    AMENITY_TYPES.spa,
    AMENITY_TYPES.pool,
    AMENITY_TYPES.restaurant,
    AMENITY_TYPES.gym,
    AMENITY_TYPES.sauna,
  ]),
  capacity: z.number(),
  slotDuration: z.number(),
  openTime: z.string(),
  closeTime: z.string(),
  requiresReservation: z.boolean(),
  onePerSlot: z.boolean(),
  price: z.number(),
  currency: z.enum([CURRENCIES.eur, CURRENCIES.rsd]),
});
