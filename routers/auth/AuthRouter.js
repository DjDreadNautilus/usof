import express from "express";
const router = express.Router();

import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";

import authController from "../../controllers/auth/authController.js";
import resetPasswordController from "../../controllers/auth/resetPasswordController.js";

import { validatePasswordReset } from "../../middleware/auth/validatePasswordReset.js";
import { validateAuth } from "../../middleware/auth/validateAuth.js";
import { validateLogin } from "../../middleware/validation/validateLogin.js";
import { validateEmail } from "../../middleware/validation/validateEmail.js";
import { validatePassword } from "../../middleware/validation/validatePassword.js";

router.post("/register", 
    validateLogin,
    validateEmail,
    validatePassword,
    authController.signup
);

router.post("/login", validateAuth, authController.login);
router.post("/logout", authenticateAccessToken, authController.logout);

router.post("/password-reset", resetPasswordController.sendResetMail);
router.post("/password-reset/:confirm_token", validatePasswordReset, resetPasswordController.resetPassword);

export default router;