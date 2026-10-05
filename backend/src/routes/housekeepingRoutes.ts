import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  housekeepingRequestSchema,
  type housekeepingRequest,
} from "../controllers/housekeeping-controllers/types.ts";
import { changeRoomHousekeeping } from "../controllers/housekeeping-controllers/changeRoomHousekeeping.ts";
import { getHousekeepingRooms } from "../controllers/housekeeping-controllers/getHousekeepingRooms.ts";

const router = express.Router();

router.post(
  "/room/:id",
  authenAndAuthorize<housekeepingRequest>([USER_ROLE.staff, USER_ROLE.admin]),
  validateRequest(housekeepingRequestSchema),
  changeRoomHousekeeping,
);

router.get(
  "/rooms",
  authenAndAuthorize<housekeepingRequest>([USER_ROLE.staff, USER_ROLE.admin]),
  getHousekeepingRooms,
);

export default router;
