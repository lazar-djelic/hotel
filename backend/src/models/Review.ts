import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        guest: {
            type: String,
            required: true,
        },
        opinion: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;