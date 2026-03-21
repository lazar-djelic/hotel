import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  checkOutRequestSchema,
  type checkOutRequest,
} from "../controllers/reception-controllers/types.ts";
import { checkOutGuest } from "../controllers/reception-controllers/checkOutGuest.ts";
import {
  CreateRoomReservationReceptionRequestSchema,
  type CreateRoomReservationReceptionRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservationsReception/types.ts";
import { createRoomReservationReception } from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservationsReception/createRoomRezervationReception.ts";

const router = express.Router();

router.post(
  "/checkout/:id",
  authenAndAuthorize<checkOutRequest>([
    USER_ROLE.receptionist,
    USER_ROLE.admin,
  ]),
  validateRequest(checkOutRequestSchema),
  checkOutGuest,
);

router
  .route("/roomreservations/")
  .post(
    authenAndAuthorize<CreateRoomReservationReceptionRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(CreateRoomReservationReceptionRequestSchema),
    createRoomReservationReception,
  );

export default router;
