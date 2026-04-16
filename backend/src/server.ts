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
import profileRoutes from "./routes/profileRoutes.ts";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { registerChatHandlers } from "./sockets/chatSocket.ts";
import messagesRoutes from "./routes/messagesRoutes.ts";
import { startReservedJob } from "./jobs/reserved.job.ts";
import taxesRoutes from "./routes/taxesRoutes.ts";
import extrasRoutes from "./routes/extrasRoutes.ts";
import paymentsRoutes from "./routes/paymentsRoutes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});
io.on("connection", (socket) => {
  registerChatHandlers(io, socket);
});

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use((req, res, next) => {
  if (req.originalUrl.includes("/webhook")) {
    next();
  } else {
    express.json()(req, res, next);
  }
});

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
app.use("/api/reception", receptionRoutes);
app.use("/api/housekeeping", housekeepingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/amenities", amenityRoutes);
app.use("/api/amenityreservations", amenityReservationsRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/messages", messagesRoutes);
app.use("/api/taxes", taxesRoutes);
app.use("/api/extras", extrasRoutes);
app.use("/api/payments", paymentsRoutes);

connectDB().then(() => {
  startReservedJob();
  startHousekeepingJob();

  server.listen(PORT, () => {
    console.log("Server started running on PORT:", PORT);
  });
});
