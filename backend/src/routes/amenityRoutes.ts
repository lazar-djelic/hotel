import express from "express";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
  CreateAmenityRequestSchema,
  type CreateAmenityRequest,
} from "../controllers/amenity-controllers/createAmenity/types.ts";
import { createAmenity } from "../controllers/amenity-controllers/createAmenity/createAmenity.ts";
import {
  GetAmenityRequestSchema,
  type GetAmenityRequest,
} from "../controllers/amenity-controllers/getAmenity/types.ts";
import { getAmenity } from "../controllers/amenity-controllers/getAmenity/getAmenity.ts";
import {
  GetAmenitiesRequestSchema,
  type GetAmenitiesRequest,
} from "../controllers/amenity-controllers/getAmenities/types.ts";
import { getAmenities } from "../controllers/amenity-controllers/getAmenities/getAmenities.ts";
import {
  UpdateAmenityRequestSchema,
  type UpdateAmenityRequest,
} from "../controllers/amenity-controllers/updateAmenity/types.ts";
import { updateAmenity } from "../controllers/amenity-controllers/updateAmenity/updateAmenity.ts";
import {
  DeleteAmenityRequestSchema,
  type DeleteAmenityRequest,
} from "../controllers/amenity-controllers/deleteAmenity/types.ts";
import { deleteAmenity } from "../controllers/amenity-controllers/deleteAmenity/deleteAmenity.ts";
import {
  GetAmenitySlotsRequestSchema,
  type GetAmenitySlotsRequest,
} from "../controllers/amenity-controllers/getAmenitySlots.ts/types.ts";
import { getAmenitySlots } from "../controllers/amenity-controllers/getAmenitySlots.ts/getAmenitySlots.ts";

const router = express.Router();

router
  .route("/")
  .get(
    authenAndAuthorize<GetAmenitiesRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(GetAmenitiesRequestSchema),
    getAmenities,
  );

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetAmenityRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(GetAmenityRequestSchema),
    getAmenity,
  );

router
  .route("/")
  .post(
    authenAndAuthorize<CreateAmenityRequest>([USER_ROLE.admin]),
    validateRequest(CreateAmenityRequestSchema),
    createAmenity,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateAmenityRequest>([USER_ROLE.admin]),
    validateRequest(UpdateAmenityRequestSchema),
    updateAmenity,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteAmenityRequest>([USER_ROLE.admin]),
    validateRequest(DeleteAmenityRequestSchema),
    deleteAmenity,
  );

router
  .route("/:id/slots")
  .get(
    authenAndAuthorize<GetAmenitySlotsRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.guest,
      USER_ROLE.admin,
    ]),
    validateRequest(GetAmenitySlotsRequestSchema),
    getAmenitySlots,
  );

export default router;
