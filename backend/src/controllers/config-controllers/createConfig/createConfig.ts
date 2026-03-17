import { type Response, type NextFunction } from "express";
import type { CreateConfigRequest } from "./types.ts";
import Configuration from "../../../models/Config.ts";
import {
  confSchema,
  confSimpleSchema,
} from "../../../schemas/config.response.schema.ts";

export async function createConfig(
  req: CreateConfigRequest,
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

    const configC = await Configuration.findOneAndUpdate(
      { _id: "hotel_configuration" },
      {
        $setOnInsert: {
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

    res.status(200).json(parsed);
  } catch (error) {
    console.error("Error in createConfig controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
