import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.ts";
import { registerUser } from "../controllers/user-controllers/register-user/registerUser.ts";
import { loginUser } from "../controllers/user-controllers/login-user/loginUser.ts";
import { logoutUser } from "../controllers/user-controllers/logout-user/logoutUser.ts";
import { isAuthenticated } from "../middlewares/isAuthenticated.ts";
import { authorizeRoles } from "../middlewares/authorizeRoles.ts";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/me", (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ authenticated: false });
  }

  res.json({
    authenticated: true,
    userId: req.session.userId,
  });
});

// PROTECTED ROUTE
router.get(
  "/protected",
  isAuthenticated,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({
      message: "Welcome to protected route!",
      userId: req.session.userId,
    });
  },
);

export default router;
