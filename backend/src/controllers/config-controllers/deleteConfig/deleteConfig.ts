import { type Response } from "express";
import type { DeleteConfigRequest } from "./types.ts";
import Configuration from "../../../models/Config.ts";

export async function deleteConfig(req: DeleteConfigRequest, res: Response) {
  try {
    const deletedConfig = await Configuration.findByIdAndDelete(
      "hotel_configuration",
    );
    if (!deletedConfig)
      return res.status(404).json({ message: "Config not found" });
    res.status(200).json({ message: "Config deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteConfig controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
