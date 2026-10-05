import cron from "node-cron";
import Room from "../models/Room.ts";
import RoomReservation from "../models/RoomReservation.ts";
import { RESERVATION_STATUS, ROOM_STATUS } from "../utils/enums.ts";

export const startReservedJob = () => {
  cron.schedule(
    "0 0 * * *",
    async () => {
      // test with * * * * * to run every minute
      try {
        console.log("Running reserved job...");

        const todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setUTCHours(23, 59, 59, 999);

        const reservations = await RoomReservation.find({
          startDate: { $gte: todayStart, $lte: todayEnd },
          assignedRoom: { $ne: null },
          resStatus: { $ne: RESERVATION_STATUS.cancelled },
        });

        const roomIds = reservations.map((r) => r.assignedRoom);

        if (roomIds.length > 0) {
          const result = await Room.updateMany(
            { _id: { $in: roomIds } },
            { $set: { status: ROOM_STATUS.reserved } },
          );
          console.log(`Reserved job: updated ${result.modifiedCount} rooms.`);
        }
      } catch (err) {
        console.error("Reserved job failed:", err);
      }
    },
    { timezone: "Etc/UTC" },
  );
};
