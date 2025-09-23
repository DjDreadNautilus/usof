import express from "express";
const router = express.Router();

import User from "../../models/User.js";
import UserController from "../../controllers/users/UserController.js";

import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";
import fileUpload from "../../middleware/fileUpload.js";

import checkAuthor from "../../middleware/checkAuthor.js";
import { checkItem } from "../../middleware/validation/checkItem.js";
import { validateLogin } from "../../middleware/validation/validateLogin.js";
import { validateEmail } from "../../middleware/validation/validateEmail.js";
import { validatePassword } from "../../middleware/validation/validatePassword.js";

router.delete("/:user_id",
    authenticateAccessToken,
    checkItem(User, "user_id"),
    checkAuthor(User),
    UserController.delete
);

router.patch("/avatar",
    authenticateAccessToken,
    checkItem(User, "user_id"),
    checkAuthor(User),
    fileUpload,
    UserController.updateAvatar
);

router.patch("/:user_id", 
    authenticateAccessToken, 
    checkItem(User, "user_id"),
    checkAuthor(User),
    validateLogin, 
    validateEmail,
    validatePassword,
    UserController.updateUser);

export default router;