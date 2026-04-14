import cron from "node-cron";
import Room from "../models/Room.ts";
import { HOUSEKEEPING_OPTIONS } from "../utils/enums.ts";

export const startHousekeepingJob = () => {
  cron.schedule(
    "0 5 * * *",
    async () => {
      // test with * * * * * to run every minute
      try {
        console.log("Running housekeeping job...");

        const todayStart = new Date();
        todayStart.setUTCHours(0, 0, 0, 0);

        const result = await Room.updateMany(
          {
            isOccupied: true,
            lastCleanedAt: { $lt: todayStart },
          },
          {
            $set: { housekeeping: HOUSEKEEPING_OPTIONS.dirty },
          },
        );
      } catch (err) {
        console.error("Housekeeping job failed:", err);
      }
    },
    { timezone: "Etc/UTC" },
  );
};
