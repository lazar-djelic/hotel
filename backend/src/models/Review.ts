import mongoose from "mongoose";

const reviewMongooseSchema = new mongoose.Schema(
  {
    guest: {
      type: String,
      required: true,
    },
    opinion: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Review = mongoose.model("Review", reviewMongooseSchema);

export default Review;
