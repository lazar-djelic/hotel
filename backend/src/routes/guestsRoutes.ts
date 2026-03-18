import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
  CreateGuestRequestSchema,
  type CreateGuestRequest,
} from "../controllers/guest-controllers/createGuest/types.ts";
import { createGuest } from "../controllers/guest-controllers/createGuest/createGuest.ts";
import {
  GetGuestsRequestSchema,
  type GetGuestsRequest,
} from "../controllers/guest-controllers/getGuests/types.ts";
import { getAllGuests } from "../controllers/guest-controllers/getGuests/getAllGuests.ts";
import {
  GetGuestRequestSchema,
  type GetGuestRequest,
} from "../controllers/guest-controllers/getGuest/types.ts";
import { getGuestById } from "../controllers/guest-controllers/getGuest/getGuestById.ts";
import {
  UpdateGuestRequestSchema,
  type UpdateGuestRequest,
} from "../controllers/guest-controllers/updateGuest/types.ts";
import { updateGuest } from "../controllers/guest-controllers/updateGuest/updateGuest.ts";
import {
  DeleteGuestRequestSchema,
  type DeleteGuestRequest,
} from "../controllers/guest-controllers/deleteGuest/types.ts";
import { deleteGuest } from "../controllers/guest-controllers/deleteGuest/deleteGuest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/roleEnums.ts";

const router = express.Router();

router
  .route("/")
  .get(
    authenAndAuthorize<GetGuestsRequest>([
      USER_ROLE.admin,
      USER_ROLE.receptionist,
    ]),
    validateRequest(GetGuestsRequestSchema),
    getAllGuests,
  );

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetGuestRequest>([
      USER_ROLE.admin,
      USER_ROLE.receptionist,
    ]),
    validateRequest(GetGuestRequestSchema),
    getGuestById,
  );

router
  .route("/")
  .post(
    authenAndAuthorize<CreateGuestRequest>([
      USER_ROLE.admin,
      USER_ROLE.receptionist,
      USER_ROLE.guest,
    ]),
    validateRequest(CreateGuestRequestSchema),
    createGuest,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateGuestRequest>([
      USER_ROLE.admin,
      USER_ROLE.receptionist,
      USER_ROLE.guest,
    ]),
    validateRequest(UpdateGuestRequestSchema),
    updateGuest,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteGuestRequest>([USER_ROLE.admin]),
    validateRequest(DeleteGuestRequestSchema),
    deleteGuest,
  );

export default router;
