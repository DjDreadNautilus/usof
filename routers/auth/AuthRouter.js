const express = require("express");
const router = express.Router();

const {validateLogin} = require("../../middleware/auth/validateLogin");
const {validateSignup} = require("../../middleware/auth/validateSignup");

const authController = require("../../controllers/auth/authController");
const resetPasswordController = require("../../controllers/auth/resetPasswordController");
const {authenticateAccessToken} = require("../../middleware/auth/authenticateAccessToken");
const {validatePasswordReset} = require("../../middleware/auth/validatePasswordReset");

router.post("/register", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);
router.post("/logout", authenticateAccessToken, authController.logout);

router.post("/password-reset", resetPasswordController.sendResetMail);
router.post("/password-reset/:confirm_token", validatePasswordReset, resetPasswordController.resetPassword);

module.exports = router;