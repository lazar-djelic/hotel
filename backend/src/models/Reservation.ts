import mongoose from "mongoose";

const reservationMongooseSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
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
    roomType: {
      type: String,
      required: true,
    },
    bedNum: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Reservation = mongoose.model(
  "room_reservations",
  reservationMongooseSchema,
);

export default Reservation;
