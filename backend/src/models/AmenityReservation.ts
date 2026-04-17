import mongoose, { Schema, type Types } from "mongoose";
import {
  AM_RES_STATUS,
  CURRENCIES,
  type AmResStatus,
  type CurrType,
} from "../utils/enums.ts";

export interface IAmenityReservation {
  amenity: Types.ObjectId;
  user?: Types.ObjectId;
  guest?: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
  rate: number;
  currency: CurrType;
  paid: boolean;
  paidDate?: Date | undefined;
  paymentIntentId?: string | undefined;
  checkoutSessionId?: string | undefined;
  refunded?: boolean | undefined;
}

const amenityReservationSchema = new Schema<IAmenityReservation>(
  {
    amenity: {
      type: Schema.Types.ObjectId,
      ref: "Amenity",
      required: true,
    },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    guest: { type: Schema.Types.ObjectId, ref: "Guest" },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    numberOfPeople: { type: Number, required: true },
    status: {
      type: String,
      enum: [
        AM_RES_STATUS.booked,
        AM_RES_STATUS.confirmed,
        AM_RES_STATUS.cancelled,
      ],
      default: AM_RES_STATUS.booked,
    },
    rate: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: [CURRENCIES.eur, CURRENCIES.rsd],
      requred: true,
    },
    paid: { type: Boolean, default: false },
    paidDate: { type: Date, required: false },
    paymentIntentId: {
      type: String,
      index: true,
      requred: false,
    },
    checkoutSessionId: {
      type: String,
      requred: false,
    },
    refunded: {
      type: Boolean,
      default: false,
      requred: false,
    },
  },
  { timestamps: true },
);

export const AmenityReservation = mongoose.model<IAmenityReservation>(
  "AmenityReservation",
  amenityReservationSchema,
);
