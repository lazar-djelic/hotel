import express from "express";
import type { Request } from "express";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { cancelRoomres } from "../controllers/cancelRes-controllers/roomres/cancelRoomRes.ts";
import { cancelAmres } from "../controllers/cancelRes-controllers/amres/cancelAmres.ts";

const router = express.Router();

router.post(
  "/roomres",
  authenAndAuthorize<Request>([
    USER_ROLE.admin,
    USER_ROLE.receptionist,
    USER_ROLE.guest,
  ]),
  cancelRoomres,
);

router.post(
  "/amres",
  authenAndAuthorize<Request>([
    USER_ROLE.admin,
    USER_ROLE.receptionist,
    USER_ROLE.guest,
  ]),
  cancelAmres,
);

export default router;
