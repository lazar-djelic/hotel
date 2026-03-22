import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import reviewsRoutes from "./routes/reviewsRoutes.ts";
import { connectDB } from "./config/db.ts";
import apiLogger from "./middlewares/apiLogger.ts";
import roomReservationsRoutes from "./routes/roomReservationsRoutes.ts";
import roomsRoutes from "./routes/roomsRoutes.ts";
import usersRoutes from "./routes/usersRoutes.ts";
import guestsRoutes from "./routes/guestsRoutes.ts";
import staysRoutes from "./routes/staysRoutes.ts";
import receptionRoutes from "./routes/receptionRoutes.ts";
import { startHousekeepingJob } from "./jobs/housekeeping.job.ts";
import housekeepingRoutes from "./routes/housekeepingRoutes.ts";
import adminRoutes from "./routes/adminRoutes.ts";
import amenityRoutes from "./routes/amenityRoutes.ts";
import amenityReservationsRoutes from "./routes/amenityReservationsRoutes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    name: "connect.sid",
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
    },
  }),
);

app.use(apiLogger);

app.use("/api/rooms", roomsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/roomreservations", roomReservationsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/guests", guestsRoutes);
app.use("/api/stays", staysRoutes);
app.use("/api/reception/", receptionRoutes);
app.use("/api/housekeeping/", housekeepingRoutes);
app.use("/api/admin/", adminRoutes);
app.use("/api/amenities/", amenityRoutes);
app.use("/api/amenityreservations/", amenityReservationsRoutes);

connectDB().then(() => {
  startHousekeepingJob();

  app.listen(PORT, () => {
    console.log("Server started running on PORT:", PORT);
  });
});
