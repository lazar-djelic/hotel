import mongoose from "mongoose";
import { number } from "zod";

const confMongooseSchema = new mongoose.Schema({
  levels: {
    type: number,
    required: true,
  },
});

const Configuration = mongoose.model("hconfig", confMongooseSchema);

export default Configuration;
