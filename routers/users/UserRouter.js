import express from "express";
const router = express.Router();

import UserController from "../../controllers/users/UserController.js";
import { validateUserUpdate } from "../../middleware/validateUserUpdate.js";
import { validateSignup } from "../../middleware/auth/validateSignup.js";
import fileUpload from "../../middleware/fileUpload.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";
import checkRights from "../../middleware/checkRights.js";
import User from "../../models/User.js";

router.get("/", UserController.getAll);
router.post("/", validateSignup, UserController.createUser);
router.get("/:user_id", UserController.getById);
router.delete("/:user_id", authenticateAccessToken, checkRights(User, "user_id"), UserController.delete);

router.patch("/avatar", authenticateAccessToken, checkRights(User, "user_id"), fileUpload, UserController.updateAvatar);
router.patch("/:user_id", authenticateAccessToken, checkRights(User, "user_id"), validateUserUpdate, UserController.updateUser);

export default router;