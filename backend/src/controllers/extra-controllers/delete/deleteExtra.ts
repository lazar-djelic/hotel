import { type Response } from "express";
import type { DeleteExtraRequest } from "./types.ts";
import Extra from "../../../models/Extra.ts";

export async function deleteExtra(req: DeleteExtraRequest, res: Response) {
  try {
    const deletedExtra = await Extra.findByIdAndDelete(req.params.id);
    if (!deletedExtra)
      return res.status(404).json({ message: "Extra not found" });
    res.status(200).json({ message: "Extra deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteExtra controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
