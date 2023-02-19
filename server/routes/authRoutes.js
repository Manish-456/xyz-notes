const express = require("express");
const loginLimiter = require("../middleware/loginLimiter");
const authController = require("../controllers/authController");

const router = express.Router();

router.route("/login").post(loginLimiter, authController.login);
router.route("/refresh").get(authController.refresh);
router.route("/logout").post(authController.logout);
module.exports = router;