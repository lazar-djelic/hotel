import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
  GetRoomReservationsRequestSchema,
  type GetRoomReservationsRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/getRoomReservations/types.ts";
import { getAllRoomReservations } from "../controllers/reservation-controllers/room-reservation-controllers/getRoomReservations/getAllRoomReservations.ts";
import {
  CreateRoomReservationRequestSchema,
  type CreateRoomReservationRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservations/types.ts";
import { createRoomReservation } from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservations/createRoomReservation.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/roleEnums.ts";
import {
  GetRoomReservationRequestSchema,
  type GetRoomReservationRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/getRoomReservation/types.ts";
import { getRoomReservationById } from "../controllers/reservation-controllers/room-reservation-controllers/getRoomReservation/getRoomReservationById.ts";
import {
  UpdateRoomReservationRequestSchema,
  type UpdateRoomReservationRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/updateRoomReservation/types.ts";
import { updateRoomReservation } from "../controllers/reservation-controllers/room-reservation-controllers/updateRoomReservation/updateRoomReservation.ts";
import {
  DeleteRoomReservationRequestSchema,
  type DeleteRoomReservationRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/deleteRoomReservation/types.ts";
import { deleteRoomReservation } from "../controllers/reservation-controllers/room-reservation-controllers/deleteRoomReservation/deleteRoomReservation.ts";
import {
  CreateRoomReservationReceptionRequestSchema,
  type CreateRoomReservationReceptionRequest,
} from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservationsReception/types.ts";
import { createRoomReservationReception } from "../controllers/reservation-controllers/room-reservation-controllers/createRoomReservationsReception/createRoomRezervationReception.ts";

const router = express.Router();

router
  .route("/")
  .get(
    authenAndAuthorize<GetRoomReservationsRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(GetRoomReservationsRequestSchema),
    getAllRoomReservations,
  );

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetRoomReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(GetRoomReservationRequestSchema),
    getRoomReservationById,
  );

router
  .route("/reception/")
  .post(
    authenAndAuthorize<CreateRoomReservationReceptionRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(CreateRoomReservationReceptionRequestSchema),
    createRoomReservationReception,
  );

router
  .route("/")
  .post(
    authenAndAuthorize<CreateRoomReservationRequest>([USER_ROLE.guest]),
    validateRequest(CreateRoomReservationRequestSchema),
    createRoomReservation,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateRoomReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(UpdateRoomReservationRequestSchema),
    updateRoomReservation,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteRoomReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(DeleteRoomReservationRequestSchema),
    deleteRoomReservation,
  );

export default router;
