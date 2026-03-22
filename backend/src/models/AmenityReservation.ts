import mongoose, { Schema, type Types } from "mongoose";
import { AM_RES_STATUS, type AmResStatus } from "../utils/enums.ts";

export interface IAmenityReservation {
  amenity: Types.ObjectId;
  user?: Types.ObjectId;
  guest?: Types.ObjectId;
  startTime: Date;
  endTime: Date;
  numberOfPeople: number;
  status: AmResStatus;
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
  },
  { timestamps: true },
);

export const AmenityReservation = mongoose.model<IAmenityReservation>(
  "AmenityReservation",
  amenityReservationSchema,
);
