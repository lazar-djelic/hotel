import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  housekeepingRequestSchema,
  type housekeepingRequest,
} from "../controllers/housekeeping-controllers/types.ts";
import { changeRoomHousekeeping } from "../controllers/housekeeping-controllers/changeRoomHousekeeping.ts";

const router = express.Router();

router.post(
  "/:id",
  authenAndAuthorize<housekeepingRequest>([
    USER_ROLE.housekeeping,
    USER_ROLE.admin,
  ]),
  validateRequest(housekeepingRequestSchema),
  changeRoomHousekeeping,
);

export default router;
