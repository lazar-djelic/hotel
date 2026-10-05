import { type Request, type Response } from "express";
import CancelPeriod from "../../../models/CancelPeriod.ts";

export async function deleteCancelPeriod(req: Request, res: Response) {
  try {
    const deletedPeriod = await CancelPeriod.findOneAndDelete({
      _id: "cancel_period",
    });
    if (!deletedPeriod)
      return res.status(404).json({ message: "Cancel period not found" });
    res.status(200).json({ message: "Cancel period deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteCancelPeriod controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
