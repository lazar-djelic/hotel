import { type Response, type NextFunction } from "express";
import { GetConfigRequestSchema, type GetConfigRequest } from "./types.ts";
import Configuration from "./mongooseModel.ts";
import { confSchema } from "./config.response.schema.ts";

export async function getConfig(
  _req: GetConfigRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const conf = await Configuration.find().lean();
    const parsed = confSchema.parse(conf[0]);
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in getAllReviews controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
