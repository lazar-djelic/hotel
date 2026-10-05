import mongoose from "mongoose";

const taxesMongooseSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "taxes",
  },
  touristTaxAd: {
    type: Number,
    required: true,
  },
  touristTaxCh: {
    type: Number,
    required: true,
  },
});

const Taxes = mongoose.model("Taxes", taxesMongooseSchema);

export default Taxes;
