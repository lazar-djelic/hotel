import express from "express";
import type { Request } from "express";
import { exportStayBill } from "../controllers/pdf-controllers/exportStayBill.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { exportRoomresBill } from "../controllers/pdf-controllers/exportRoomresBill.ts";
import { exportAmresBill } from "../controllers/pdf-controllers/exportAmresBill.ts";

const router = express.Router();

router.post(
  "/stay",
  authenAndAuthorize<Request>([
    USER_ROLE.receptionist,
    USER_ROLE.admin,
    USER_ROLE.guest,
  ]),
  exportStayBill,
);

router.post(
  "/roomres",
  authenAndAuthorize<Request>([
    USER_ROLE.receptionist,
    USER_ROLE.admin,
    USER_ROLE.guest,
  ]),
  exportRoomresBill,
);

router.post(
  "/amres",
  authenAndAuthorize<Request>([
    USER_ROLE.receptionist,
    USER_ROLE.admin,
    USER_ROLE.guest,
  ]),
  exportAmresBill,
);

export default router;
