import { type Response, type NextFunction } from "express";
import { GetConfigRequestSchema, type GetConfigRequest } from "./types.ts";
import Configuration from "../../../models/Config.ts";
import { confSchema } from "../../../schemas/config.response.schema.ts";

export async function getConfig(
  _req: GetConfigRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const conf = await Configuration.findById("hotel_configuration");

    if (!conf) {
      return res.status(404).json({ message: "Config not created yet" });
    }

    const parsed = confSchema.parse(conf);
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in getConfig controller", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
