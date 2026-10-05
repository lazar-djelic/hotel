import { type Request, type Response } from "express";
import Taxes from "../../../models/Taxes.ts";

export async function deleteTaxes(req: Request, res: Response) {
  try {
    const deletedTaxes = await Taxes.findOneAndDelete({ _id: "taxes" });
    if (!deletedTaxes)
      return res.status(404).json({ message: "Taxes not found" });
    res.status(200).json({ message: "Taxes deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteTaxes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
