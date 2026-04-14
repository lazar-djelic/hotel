import express from "express";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
  CreateExtraRequestSchema,
  type CreateExtraRequest,
} from "../controllers/extra-controllers/create/types.ts";
import { createExtra } from "../controllers/extra-controllers/create/createExtra.ts";
import { type Request } from "express";
import { getAllExtras } from "../controllers/extra-controllers/getAll/getAllExtras.ts";
import {
  GetExtraRequestSchema,
  type GetExtraRequest,
} from "../controllers/extra-controllers/getOne/types.ts";
import { getExtraById } from "../controllers/extra-controllers/getOne/getExtraById.ts";
import {
  UpdateExtraRequestSchema,
  type UpdateExtraRequest,
} from "../controllers/extra-controllers/update/types.ts";
import { updateExtra } from "../controllers/extra-controllers/update/updateExtra.ts";
import {
  DeleteExtraRequestSchema,
  type DeleteExtraRequest,
} from "../controllers/extra-controllers/delete/types.ts";
import { deleteExtra } from "../controllers/extra-controllers/delete/deleteExtra.ts";

const router = express.Router();

router
  .route("/")
  .get(
    authenAndAuthorize<Request>([
      USER_ROLE.admin,
      USER_ROLE.receptionist,
      USER_ROLE.staff,
    ]),
    getAllExtras,
  );

router
  .route("/:id")
  .get(
    authenAndAuthorize<GetExtraRequest>([
      USER_ROLE.admin,
      USER_ROLE.receptionist,
      USER_ROLE.staff,
    ]),
    validateRequest(GetExtraRequestSchema),
    getExtraById,
  );

router
  .route("/")
  .post(
    authenAndAuthorize<CreateExtraRequest>([USER_ROLE.admin]),
    validateRequest(CreateExtraRequestSchema),
    createExtra,
  );

router
  .route("/:id")
  .put(
    authenAndAuthorize<UpdateExtraRequest>([USER_ROLE.admin]),
    validateRequest(UpdateExtraRequestSchema),
    updateExtra,
  );

router
  .route("/:id")
  .delete(
    authenAndAuthorize<DeleteExtraRequest>([USER_ROLE.admin]),
    validateRequest(DeleteExtraRequestSchema),
    deleteExtra,
  );

export default router;
