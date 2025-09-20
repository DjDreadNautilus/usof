import express from "express";
const router = express.Router();

import UserController from "../../controllers/users/UserController.js";
import { validateSignup } from "../../middleware/auth/validateSignup.js";
import { validateUserUpdate } from "../../middleware/validateUserUpdate.js";
import fileUpload from "../../middleware/fileUpload.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";

router.get("/", UserController.getAll);
router.get("/:user_id", UserController.getById);
router.delete("/:user_id", UserController.delete);
router.post("/", validateSignup, UserController.createUser);
router.patch("/avatar", fileUpload, UserController.updateAvatar);
router.patch("/:user_id", validateUserUpdate, UserController.updateUser);


export default router;