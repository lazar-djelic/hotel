import mongoose from "mongoose";

const guestMongooseSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      required: true,
    },
    lName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    personalID: {
      type: Number,
      required: true,
      unique: true,
    },
    birthDate: {
      type: Date,
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  { timestamps: true },
);

const Guest = mongoose.model("Guest", guestMongooseSchema);

export default Guest;
