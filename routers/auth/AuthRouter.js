import express from "express";
const router = express.Router();

import { validateLogin } from "../../middleware/auth/validateLogin.js";
import { validateSignup } from "../../middleware/auth/validateSignup.js";
import authController from "../../controllers/auth/authController.js";
import resetPasswordController from "../../controllers/auth/resetPasswordController.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";
import { validatePasswordReset } from "../../middleware/auth/validatePasswordReset.js";

router.post("/register", validateSignup, authController.signup);
router.post("/login", validateLogin, authController.login);
router.post("/logout", authenticateAccessToken, authController.logout);

router.post("/password-reset", resetPasswordController.sendResetMail);
router.post("/password-reset/:confirm_token", validatePasswordReset, resetPasswordController.resetPassword);

export default router;