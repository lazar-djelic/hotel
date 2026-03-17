import { type Response, type NextFunction } from "express";
import type { UpdateConfigRequest } from "./types.ts";
import Configuration from "../../../models/Config.ts";
import { confSimpleSchema } from "../../../schemas/config.response.schema.ts";

export async function updateConfig(
  req: UpdateConfigRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const { levels, room, conference, spa, pool, restaurant, gym, sauna } =
      req.body;
    const config = new Configuration({
      levels,
      room,
      conference,
      spa,
      pool,
      restaurant,
      gym,
      sauna,
    });
    const parsed = confSimpleSchema.parse(config);

    const updatedConfig = await Configuration.findOneAndUpdate(
      { _id: "hotel_configuration" },
      {
        $set: {
          levels,
          room,
          conference,
          spa,
          pool,
          restaurant,
          gym,
          sauna,
        },
      },
      {
        new: true,
        upsert: true,
      },
    );

    if (!updatedConfig)
      return res.status(404).json({ message: "Config not found" });
    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in updateConfig controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
