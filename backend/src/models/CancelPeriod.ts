import mongoose from "mongoose";

const cancelPeriodMongooseSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "cancel_period",
  },
  hours: {
    type: Number,
    required: true,
  },
});

const CancelPeriod = mongoose.model("CancelPeriod", cancelPeriodMongooseSchema);

export default CancelPeriod;
