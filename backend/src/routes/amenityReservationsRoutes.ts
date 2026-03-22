import express from "express";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
  CreateAmenityReservationRequestSchema,
  type CreateAmenityReservationRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/createAmenityReservation/types.ts";
import { createAmenityReservation } from "../controllers/reservation-controllers/amenities-reservation-controllers/createAmenityReservation/createAmenityReservation.ts";
import {
  GetAmenityReservationRequestSchema,
  type GetAmenityReservationRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/getAmenityReservation/types.ts";
import { getAmenityReservation } from "../controllers/reservation-controllers/amenities-reservation-controllers/getAmenityReservation/getAmenityReservation.ts";
import {
  UpdateAmenityReservationRequestSchema,
  type UpdateAmenityReservationRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/updateAmenityReservation/types.ts";
import { updateAmenityReservation } from "../controllers/reservation-controllers/amenities-reservation-controllers/updateAmenityReservation/updateAmenityReservation.ts";
import {
  DeleteAmenityReservationRequestSchema,
  type DeleteAmenityReservationRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/deleteAmenityReservation/types.ts";
import { deleteAmenityReservation } from "../controllers/reservation-controllers/amenities-reservation-controllers/deleteAmenityReservation/deleteAmenityReservation.ts";
import {
  GetAmenityReservationsRequestSchema,
  type GetAmenityReservationsRequest,
} from "../controllers/reservation-controllers/amenities-reservation-controllers/getAmenityReservations.ts/types.ts";
import { getAmenityReservations } from "../controllers/reservation-controllers/amenities-reservation-controllers/getAmenityReservations.ts/getAmenityReservations.ts";

const router = express.Router();

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetAmenityReservationsRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(GetAmenityReservationsRequestSchema),
    getAmenityReservations,
  );

router
  .route("/one/:id")
  .get(
    authenAndAuthorize<GetAmenityReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(GetAmenityReservationRequestSchema),
    getAmenityReservation,
  );

router
  .route("/:id")
  .post(
    authenAndAuthorize<CreateAmenityReservationRequest>([USER_ROLE.guest]),
    validateRequest(CreateAmenityReservationRequestSchema),
    createAmenityReservation,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateAmenityReservationRequest>([USER_ROLE.guest]),
    validateRequest(UpdateAmenityReservationRequestSchema),
    updateAmenityReservation,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteAmenityReservationRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(DeleteAmenityReservationRequestSchema),
    deleteAmenityReservation,
  );

export default router;
