import mongoose from "mongoose";
import { boolean, number } from "zod";

const confMongooseSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: "global_config",
  },
  levels: {
    type: number,
    required: true,
  },
  room: {
    type: boolean,
    requred: true,
  },
  conference: {
    type: boolean,
    requred: true,
  },
  spa: {
    type: boolean,
    requred: true,
  },
  pool: {
    type: boolean,
    requred: true,
  },
  restaurant: {
    type: boolean,
    requred: true,
  },
  gym: {
    type: boolean,
    requred: true,
  },
  sauna: {
    type: boolean,
    requred: true,
  },
});

const Configuration = mongoose.model("hconfig", confMongooseSchema);

export default Configuration;
