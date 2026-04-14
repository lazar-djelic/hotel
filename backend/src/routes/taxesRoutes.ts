import express from "express";
import { validateRequest } from "../middlewares/validateRequest.ts";
import {
  CreateTaxesRequestSchema,
  type CreateTaxesRequest,
} from "../controllers/taxes-controllers/create/types.ts";
import { createUpdateTaxes } from "../controllers/taxes-controllers/create/createUpdateTaxes.ts";
import { authenAndAuthorize } from "../middlewares/authAndAuthorize.ts";
import { USER_ROLE } from "../utils/enums.ts";
import { getTaxes } from "../controllers/taxes-controllers/get/getTaxes.ts";
import { deleteTaxes } from "../controllers/taxes-controllers/delete/deleteTaxes.ts";

const router = express.Router();

router.post(
  "/",
  authenAndAuthorize<CreateTaxesRequest>([USER_ROLE.admin]),
  validateRequest(CreateTaxesRequestSchema),
  createUpdateTaxes,
);

router.get(
  "/",
  authenAndAuthorize<CreateTaxesRequest>([USER_ROLE.admin]),
  getTaxes,
);

router.delete(
  "/",
  authenAndAuthorize<CreateTaxesRequest>([USER_ROLE.admin]),
  deleteTaxes,
);

export default router;
