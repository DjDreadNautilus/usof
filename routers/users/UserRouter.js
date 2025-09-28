import express from "express";
const router = express.Router();

import User from "../../models/User.js";
import UserController from "../../controllers/users/UserController.js";

import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";
import avatarUpload from "../../middleware/avatarUpload.js";

import checkAuthor from "../../middleware/users/checkAuthor.js";
import { checkItem } from "../../middleware/checkItem.js";
import { validateLogin } from "../../middleware/auth/validateLogin.js";
import { validateEmail } from "../../middleware/auth/validateEmail.js";
import { validatePassword } from "../../middleware/auth/validatePassword.js";

router.get("/", UserController.getAll);
router.get("/:user_id", 
    checkItem(User, "user_id"),
    UserController.getById
);

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
    avatarUpload,
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