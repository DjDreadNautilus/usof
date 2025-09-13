const express = require("express");
const router = express.Router();

const {validateLogin} = require("../../middleware/auth/validateLogin");
const {validateSignup} = require("../../middleware/auth/validateSignup");

const authController = require("../../controllers/auth/authController");
const {authenticateAccessToken} = require("../../middleware/auth/authenticateAccessToken");

router.post("/register", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);
router.post("/logout", authenticateAccessToken, authController.logout);

module.exports = router;