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
    room: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("reservations", reservationMongooseSchema);

export default Reservation;
