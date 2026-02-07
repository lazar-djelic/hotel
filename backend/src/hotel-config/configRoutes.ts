import express from "express";
import { GetConfigRequestSchema } from "./types.ts";
import { getConfig } from "./getConfig.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";

const router = express.Router();

router.route("/").get(validateRequest(GetConfigRequestSchema), getConfig);

export default router;
