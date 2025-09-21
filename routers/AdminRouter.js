import express from "express";
const router = express.Router();

import UserController from "../controllers/users/UserController.js";
import { validateSignup } from "../middleware/auth/validateSignup.js";
import { validateUserUpdate } from "../middleware/validateUserUpdate.js";
import { authenticateAccessToken } from "../middleware/auth/authenticateAccessToken.js";
import PostController from "../controllers/posts/PostController.js";
import CommentController from "../controllers/posts/CommentController.js";
import CategoryController from "../controllers/posts/CategoryController.js";
import checkAdmin from "../middleware/checkAdmin.js";

router.use(authenticateAccessToken, checkAdmin);

//users

//posts

//comments

//categories

//likes

export default router;