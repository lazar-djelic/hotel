import mongoose from "mongoose";

const extraMongooseSchema = new mongoose.Schema({
  nameEng: {
    type: String,
    required: true,
  },
  nameSrb: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

const Extra = mongoose.model("Extra", extraMongooseSchema);

export default Extra;
