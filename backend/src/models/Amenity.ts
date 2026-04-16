import mongoose, { Schema, Types } from "mongoose";
import {
  AMENITY_TYPES,
  CURRENCIES,
  type AmenityTypes,
  type CurrType,
} from "../utils/enums.ts";

export interface IAmenity {
  name: string;
  type: AmenityTypes;
  capacity: number;
  slotDuration: number;
  openTime: string;
  closeTime: string;
  requiresReservation: boolean;
  onePerSlot: boolean;
  price: number;
  currency: CurrType;
}

const amenitySchema = new Schema<IAmenity>(
  {
    name: { type: String, required: true },
    type: {
      type: String,
      enum: [
        AMENITY_TYPES.spa,
        AMENITY_TYPES.restaurant,
        AMENITY_TYPES.conference,
        AMENITY_TYPES.pool,
        AMENITY_TYPES.gym,
        AMENITY_TYPES.sauna,
      ],
      required: true,
    },
    capacity: { type: Number, required: true },
    slotDuration: { type: Number, required: true },
    openTime: { type: String, required: true },
    closeTime: { type: String, required: true },
    requiresReservation: { type: Boolean, default: true },
    onePerSlot: { type: Boolean, required: true },
    price: { type: Number, required: true },
    currency: {
      type: String,
      enum: [CURRENCIES.eur, CURRENCIES.rsd],
      required: true,
    },
  },
  { timestamps: true },
);

export const Amenity = mongoose.model<IAmenity>("Amenity", amenitySchema);
