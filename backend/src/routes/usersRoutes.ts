import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import { registerUser } from "../controllers/user-controllers/register-user/registerUser.ts";
import { loginUser } from "../controllers/user-controllers/login-user/loginUser.ts";
import { logoutUser } from "../controllers/user-controllers/logout-user/logoutUser.ts";
import { isAuthenticated } from "../middlewares/isAuthenticated.ts";
import { authorizeRoles } from "../middlewares/authorizeRoles.ts";
import { getMe } from "../middlewares/getMe.ts";
import { validateRequest } from "../middlewares/validateRequest.ts";
import { RegisterUserRequestSchema } from "../controllers/user-controllers/register-user/types.ts";
import { LoginUserRequestSchema } from "../controllers/user-controllers/login-user/types.ts";

const router = express.Router();

router.post(
  "/register",
  validateRequest(RegisterUserRequestSchema),
  registerUser,
);
router.post("/login", validateRequest(LoginUserRequestSchema), loginUser);
router.post("/logout", logoutUser);

router.get("/me", isAuthenticated, getMe);

// PROTECTED ROUTE
// router.get(
//   "/protected",
//   isAuthenticated,
//   authorizeRoles("admin"),
//   (req, res) => {
//     res.json({
//       message: "Welcome to protected route!",
//       userId: req.session.userId,
//     });
//   },
// );

export default router;
