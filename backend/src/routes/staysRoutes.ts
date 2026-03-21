import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  CreateStayRequestSchema,
  type CreateStayRequest,
} from "../controllers/stay-controllers/createStay/types.ts";
import { createStay } from "../controllers/stay-controllers/createStay/createStay.ts";
import {
  GetStaysRequestSchema,
  type GetStaysRequest,
} from "../controllers/stay-controllers/getStays/types.ts";
import { getAllStays } from "../controllers/stay-controllers/getStays/getStays.ts";
import {
  GetStayRequestSchema,
  type GetStayRequest,
} from "../controllers/stay-controllers/getStay/types.ts";
import { getStayById } from "../controllers/stay-controllers/getStay/getStayById.ts";
import {
  UpdateStayRequestSchema,
  type UpdateStayRequest,
} from "../controllers/stay-controllers/updateStay/types.ts";
import { updateStay } from "../controllers/stay-controllers/updateStay/updateStay.ts";
import {
  DeleteStayRequestSchema,
  type DeleteStayRequest,
} from "../controllers/stay-controllers/deleteStay/types.ts";
import { deleteStay } from "../controllers/stay-controllers/deleteStay/deleteStay.ts";

const router = express.Router();

router
  .route("/")
  .post(
    authenAndAuthorize<CreateStayRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(CreateStayRequestSchema),
    createStay,
  );

router
  .route("/")
  .get(
    authenAndAuthorize<GetStaysRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(GetStaysRequestSchema),
    getAllStays,
  );

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetStayRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(GetStayRequestSchema),
    getStayById,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateStayRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(UpdateStayRequestSchema),
    updateStay,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteStayRequest>([
      USER_ROLE.receptionist,
      USER_ROLE.admin,
    ]),
    validateRequest(DeleteStayRequestSchema),
    deleteStay,
  );

export default router;
