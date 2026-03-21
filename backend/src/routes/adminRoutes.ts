import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  roleRequestSchema,
  type roleRequest,
} from "../controllers/admin-controllers/types.ts";
import { changeRole } from "../controllers/admin-controllers/changeRole.ts";

const router = express.Router();

router.post(
  "/role/:id",
  authenAndAuthorize<roleRequest>([USER_ROLE.admin]),
  validateRequest(roleRequestSchema),
  changeRole,
);

export default router;
