const express = require("express");
const router = express.Router();
const { register, login, updateUser } = require("../controllers/auth");
const authenticateUser = require("../middleware/authentication");
const testUser = require("../middleware/test-user");
const rateLimit = require("express-rate-limit");

const apiLimit = rateLimit({
  windows: 15 * 60 * 1000, // 15 minutes
  max: 10,
  message: {
    msg: "Too many requests from this IP.\nPlease try again after 15 minutes",
  },
});
router.post("/register", apiLimit, register);
router.post("/login", apiLimit, login);
router.patch("/updateUser", authenticateUser, testUser, updateUser);

module.exports = router;
