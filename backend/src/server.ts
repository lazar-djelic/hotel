import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import reviewsRoutes from "./routes/reviewsRoutes.ts";
import { connectDB } from "./config/db.ts";
import apiLogger from "./middlewares/apiLogger.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middlewares
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(apiLogger);

app.use("/api/reviews", reviewsRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started running on PORT:", PORT);
  });
});
