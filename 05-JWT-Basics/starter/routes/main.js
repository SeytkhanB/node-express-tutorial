import { dashboard, login } from "../controllers/main.js";
import authMiddleware from "../middleware/auth.js";
import express from "express";
const router = express.Router();

router.route("/login").post(login);
router.route("/dashboard").get(authMiddleware, dashboard);
//                                ↑ means
//  users that come to dashboard should go through "authMiddleware" first

export default router;
