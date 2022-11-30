import {
  login,
  logout,
  register,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";
import express from "express";
import { authenticateUser } from "../middleware/authentication.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.delete("/logout", authenticateUser, logout);
router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
