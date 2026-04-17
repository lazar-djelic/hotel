import mongoose from "mongoose";
import { CURRENCIES, RESERVATION_STATUS } from "../utils/enums.ts";

const roomReservationMongooseSchema = new mongoose.Schema(
  {
    guest: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Guest",
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    adults: { type: Number, default: 1 },
    children: { type: Number, default: 0 },
    assignedRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
    resStatus: {
      type: String,
      enum: [
        RESERVATION_STATUS.booked,
        RESERVATION_STATUS.confirmed,
        RESERVATION_STATUS.checked_in,
        RESERVATION_STATUS.cancelled,
      ],
      default: RESERVATION_STATUS.booked,
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
    paid: {
      type: Boolean,
      default: false,
    },
    paidDate: {
      type: Date,
      requred: false,
    },
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

const RoomReservation = mongoose.model(
  "room_reservations",
  roomReservationMongooseSchema,
);

export default RoomReservation;
