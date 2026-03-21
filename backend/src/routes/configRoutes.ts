import express from "express";
import {
  GetConfigRequestSchema,
  type GetConfigRequest,
} from "../controllers/config-controllers/getConfig/types.ts";
import { getConfig } from "../controllers/config-controllers/getConfig/getConfig.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import {
  CreateConfigRequestSchema,
  type CreateConfigRequest,
} from "../controllers/config-controllers/createConfig/types.ts";
import { createConfig } from "../controllers/config-controllers/createConfig/createConfig.ts";
import {
  UpdateConfigRequestSchema,
  type UpdateConfigRequest,
} from "../controllers/config-controllers/updateConfig/types.ts";
import { updateConfig } from "../controllers/config-controllers/updateConfig/updateConfig.ts";
import {
  DeleteConfigRequestSchema,
  type DeleteConfigRequest,
} from "../controllers/config-controllers/deleteConfig/types.ts";
import { deleteConfig } from "../controllers/config-controllers/deleteConfig/deleteConfig.ts";

const router = express.Router();

router
  .route("/")
  .get(
    authenAndAuthorize<GetConfigRequest>([USER_ROLE.admin]),
    validateRequest(GetConfigRequestSchema),
    getConfig,
  );

router
  .route("/")
  .post(
    authenAndAuthorize<CreateConfigRequest>([USER_ROLE.admin]),
    validateRequest(CreateConfigRequestSchema),
    createConfig,
  );

router
  .route("/")
  .put(
    authenAndAuthorize<UpdateConfigRequest>([USER_ROLE.admin]),
    validateRequest(UpdateConfigRequestSchema),
    updateConfig,
  );

router
  .route("/")
  .delete(
    authenAndAuthorize<DeleteConfigRequest>([USER_ROLE.admin]),
    validateRequest(DeleteConfigRequestSchema),
    deleteConfig,
  );

export default router;
