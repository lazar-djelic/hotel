import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import reviewsRoutes from "./routes/reviewsRoutes.ts";
import { connectDB } from "./config/db.ts";
import apiLogger from "./middlewares/apiLogger.ts";
import configRoutes from "./hotel-config/configRoutes.ts";
import reservationsRoutes from "./routes/reservationsRoutes.ts";
import roomsRoutes from "./routes/roomsRoutes.ts";
import usersRoutes from "./routes/usersRoutes.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
    },
  }),
);

app.use(apiLogger);

app.use("/api/config", configRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/users", usersRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started running on PORT:", PORT);
  });
});
