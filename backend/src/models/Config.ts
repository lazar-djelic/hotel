import mongoose from "mongoose";
import { boolean, number } from "zod";

const confMongooseSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "global_config",
  },
  levels: {
    type: Number,
    required: true,
  },
  room: {
    type: Boolean,
    requred: true,
  },
  conference: {
    type: Boolean,
    requred: true,
  },
  spa: {
    type: Boolean,
    requred: true,
  },
  pool: {
    type: Boolean,
    requred: true,
  },
  restaurant: {
    type: Boolean,
    requred: true,
  },
  gym: {
    type: Boolean,
    requred: true,
  },
  sauna: {
    type: Boolean,
    requred: true,
  },
});

const Configuration = mongoose.model("hconfig", confMongooseSchema);

export default Configuration;
