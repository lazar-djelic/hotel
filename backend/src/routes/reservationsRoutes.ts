import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { GetReservationsRequestSchema } from "../controllers/reservation-controllers/getReservations/types.ts";
import { getAllReservations } from "../controllers/reservation-controllers/getReservations/getAllReservations.ts";
import { CreateReservationRequestSchema } from "../controllers/reservation-controllers/createReservations/types.ts";
import { createReservation } from "../controllers/reservation-controllers/createReservations/createReservation.ts";

const router = express.Router();

router
  .route("/")
  .get(validateRequest(GetReservationsRequestSchema), getAllReservations);
router
  .route("/")
  .post(validateRequest(CreateReservationRequestSchema), createReservation);

export default router;
