import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { CreateGuestRequestSchema } from "../controllers/guest-controllers/createGuest/types.ts";
import { createGuest } from "../controllers/guest-controllers/createGuest/createGuest.ts";
import { GetGuestsRequestSchema } from "../controllers/guest-controllers/getGuests/types.ts";
import { getAllGuests } from "../controllers/guest-controllers/getGuests/getAllGuests.ts";
import { GetGuestRequestSchema } from "../controllers/guest-controllers/getGuest/types.ts";
import { getGuestById } from "../controllers/guest-controllers/getGuest/getGuestById.ts";
import { UpdateGuestRequestSchema } from "../controllers/guest-controllers/updateGuest/types.ts";
import { updateGuest } from "../controllers/guest-controllers/updateGuest/updateGuest.ts";
import { DeleteGuestRequestSchema } from "../controllers/guest-controllers/deleteGuest/types.ts";
import { deleteGuest } from "../controllers/guest-controllers/deleteGuest/deleteGuest.ts";

const router = express.Router();

router.route("/").get(validateRequest(GetGuestsRequestSchema), getAllGuests);
router.route("/:id").get(validateRequest(GetGuestRequestSchema), getGuestById);
router.route("/").post(validateRequest(CreateGuestRequestSchema), createGuest);
router
  .route("/:id")
  .put(validateRequest(UpdateGuestRequestSchema), updateGuest);
router
  .route("/:id")
  .delete(validateRequest(DeleteGuestRequestSchema), deleteGuest);

export default router;
