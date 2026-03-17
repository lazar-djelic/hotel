import { type Response } from "express";
import type { DeleteRoomReservationRequest } from "./types.ts";
import RoomReservation from "../../../../models/RoomReservation.ts";
import { USER_ROLE } from "../../../../utils/roleEnums.ts";

export async function deleteRoomReservation(
  req: DeleteRoomReservationRequest,
  res: Response,
) {
  try {
    const filter: any = { _id: req.params.id };

    if (req.session.role === USER_ROLE.guest) {
      filter.guest = req.session.guest;
    }

    const deletedReservation = await RoomReservation.findOneAndDelete(filter);

    if (!deletedReservation)
      return res.status(404).json({ message: "Room reservation not found" });
    res.status(200).json({ message: "Room reservation deleted successfuly" });
  } catch (error) {
    console.error("Error in deleteRoomReservation controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
