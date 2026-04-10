import express from "express";
import type { Request, Response, NextFunction } from "express";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { getAllMyMessages } from "../controllers/messages-controllers/getAllMyMessages.ts";
import { markSeen } from "../controllers/messages-controllers/markSeen.ts";

const router = express.Router();

router.get(
  "/",
  authenAndAuthorize<Request>([USER_ROLE.receptionist, USER_ROLE.guest]),
  getAllMyMessages,
);

router.put(
  "/mark-seen",
  authenAndAuthorize<Request>([USER_ROLE.receptionist, USER_ROLE.guest]),
  markSeen,
);

export default router;
