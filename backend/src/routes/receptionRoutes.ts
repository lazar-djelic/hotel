import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  checkOutRequestSchema,
  type checkOutRequest,
} from "../controllers/reception-controllers/types.ts";
import { checkOutGuest } from "../controllers/reception-controllers/checkOutGuest.ts";
import { updateAmenityReservationReception } from "../controllers/reservation-controllers/amenities-reservation-controllers/updateAmenityReservationReception/updateAmenityReservationReception.ts";
import {
  CreateAmenityReservationRequestSchema,
  type CreateAmenityReservationRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/createAmenityReservationRec/types.ts";
import { createAmenityReservation } from "../controllers/reservation-controllers/amenities-reservation-controllers/createAmenityReservationRec/createAmenityResRec.ts";
import {
  CreateGuestAndAmenityResRequestSchema,
  type CreateGuestAndAmenityResRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/createGuestAndAmenityRec/types.ts";
import { createGuestAndAmenityRes } from "../controllers/reservation-controllers/amenities-reservation-controllers/createGuestAndAmenityRec/createGuestAndAmenityRes.ts";
import {
  UpdateAmenityReservationReceptionRequestSchema,
  type UpdateAmenityReservationReceptionRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/updateAmenityReservationReception/types.ts";
import {
  CreateRoomReservationRequestSchema,
  type CreateRoomReservationRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservations/types.ts";
import { createRoomRes } from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservations/createRoomRes.ts";
import {
  CreateRoomReservationReceptionRequestSchema,
  type CreateRoomReservationReceptionRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservationsReception/types.ts";
import { createGuestAndRoomRes } from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservationsReception/createGuestAndRoomRes.ts";
import {
  UpdateRoomReservationRequestSchema,
  type UpdateRoomReservationRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/updateRoomReservation/types.ts";
import { updateRoomReservationSimpleSchema } from "../schemas/roomReservation.response.schema.ts";
import { updateRoomReservation } from "../controllers/reservation-controllers/room-reservation-controllers/updateRoomReservation/updateRoomReservation.ts";

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
    authenAndAuthorize<CreateRoomReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(CreateRoomReservationRequestSchema),
    createRoomRes,
  );

router
  .route("/guest-roomreservations/")
  .post(
    authenAndAuthorize<CreateRoomReservationReceptionRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(CreateRoomReservationReceptionRequestSchema),
    createGuestAndRoomRes,
  );

router
  .route("/updateRoomRes/:id")
  .put(
    authenAndAuthorize<UpdateRoomReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(UpdateRoomReservationRequestSchema),
    updateRoomReservation,
  );

router
  .route("/updateAmenityRes/:id")
  .put(
    authenAndAuthorize<UpdateAmenityReservationReceptionRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(UpdateAmenityReservationReceptionRequestSchema),
    updateAmenityReservationReception,
  );

router
  .route("/amenityreservations/:id")
  .post(
    authenAndAuthorize<CreateAmenityReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(CreateAmenityReservationRequestSchema),
    createAmenityReservation,
  );

router
  .route("/guest-amenityreservations/:id")
  .post(
    authenAndAuthorize<CreateGuestAndAmenityResRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(CreateGuestAndAmenityResRequestSchema),
    createGuestAndAmenityRes,
  );

export default router;
