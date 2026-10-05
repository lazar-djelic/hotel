import express from "express";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import type { Request, Response, NextFunction } from "express";
import { USER_ROLE } from "../utils/enums.ts";
import { getMyReview } from "../controllers/profile-controllers/getMyReview.ts";
import { getMyAmRes } from "../controllers/profile-controllers/getMyAmRes.ts";
import { getMyRoomRes } from "../controllers/profile-controllers/getMyRoomRes.ts";
import { getMyStays } from "../controllers/profile-controllers/getMyStays.ts";

const router = express.Router();

router
  .route("/myreview")
  .get(authenAndAuthorize<Request>([USER_ROLE.guest]), getMyReview);

router
  .route("/myamres")
  .get(authenAndAuthorize<Request>([USER_ROLE.guest]), getMyAmRes);

router
  .route("/myroomres")
  .get(authenAndAuthorize<Request>([USER_ROLE.guest]), getMyRoomRes);

router
  .route("/mystays")
  .get(authenAndAuthorize<Request>([USER_ROLE.guest]), getMyStays);

export default router;
