import mongoose, { Document, Schema, Types } from "mongoose";
import {
  CURRENCIES,
  STAY_STATUS,
  type CurrType,
  type StStatus,
} from "../utils/enums.ts";

export interface IStay {
  guest: Types.ObjectId;
  reservation?: Types.ObjectId | null;
  room: Types.ObjectId;
  checkIn: Date;
  checkOut?: Date | null;
  stStatus: StStatus;
  adults?: number;
  children?: number;
  rate?: number;
  currency?: CurrType;
  extras?: {
    type: string;
    amount: number;
  }[];
  notes?: string;
}

const staySchema = new Schema<IStay>(
  {
    guest: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
    reservation: {
      type: Schema.Types.ObjectId,
      ref: "room_reservations",
      default: null,
    },
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, default: null },
    stStatus: {
      type: String,
      enum: [
        STAY_STATUS.checked_in,
        STAY_STATUS.checked_out,
        STAY_STATUS.cancelled,
        STAY_STATUS.no_show,
      ],
      default: STAY_STATUS.checked_in,
    },
    adults: Number,
    children: Number,
    rate: Number,
    currency: { type: String, default: CURRENCIES.rsd },
    extras: [
      {
        type: { type: String },
        amount: Number,
      },
    ],
    notes: String,
  },
  { timestamps: true },
);

export const Stay = mongoose.model<IStay>("Stay", staySchema);
