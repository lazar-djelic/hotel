import express from "express";
import type { Request } from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  CreateCancelPeriodRequestSchema,
  type CreateCancelPeriodRequest,
} from "../controllers/cancelPeriod-controllers/create/types.ts";
import { createUpdateCancelPeriod } from "../controllers/cancelPeriod-controllers/create/createUpdateCancelPeriod.ts";
import { getCancelPeriod } from "../controllers/cancelPeriod-controllers/get/getCancelPeriod.ts";
import { deleteCancelPeriod } from "../controllers/cancelPeriod-controllers/delete/deleteCancelPeriod.ts";

const router = express.Router();

router.post(
  "/",
  authenAndAuthorize<CreateCancelPeriodRequest>([USER_ROLE.admin]),
  validateRequest(CreateCancelPeriodRequestSchema),
  createUpdateCancelPeriod,
);

router.get(
  "/",
  authenAndAuthorize<Request>([
    USER_ROLE.admin,
    USER_ROLE.receptionist,
    USER_ROLE.guest,
  ]),
  getCancelPeriod,
);

router.delete(
  "/",
  authenAndAuthorize<Request>([USER_ROLE.admin]),
  deleteCancelPeriod,
);

export default router;
