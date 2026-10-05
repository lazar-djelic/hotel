import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  roleRequestSchema,
  type roleRequest,
} from "../controllers/admin-controllers/types.ts";
import { changeRole } from "../controllers/admin-controllers/changeRole.ts";
import {
  GetUsersRequestSchema,
  type GetUsersRequest,
} from "../controllers/user-controllers/get-users/types.ts";
import { getUsers } from "../controllers/user-controllers/get-users/getUsers.ts";

const router = express.Router();

router.get(
  "/users",
  authenAndAuthorize<GetUsersRequest>([USER_ROLE.admin]),
  validateRequest(GetUsersRequestSchema),
  getUsers,
);

router.post(
  "/role/:id",
  authenAndAuthorize<roleRequest>([USER_ROLE.admin]),
  validateRequest(roleRequestSchema),
  changeRole,
);

export default router;
