import express from "express";
const router = express.Router();

import UserController from "../controllers/users/UserController.js";
import { authenticateAccessToken } from "../middleware/auth/authenticateAccessToken.js";
import PostController from "../controllers/posts/PostController.js";
import CommentController from "../controllers/posts/CommentController.js";
import CategoryController from "../controllers/posts/CategoryController.js";
import { validateCategories } from "../middleware/validation/validateCategories.js";
import { validateStatus } from "../middleware/validation/validateStatus.js";
import { checkItem } from "../middleware/validation/checkItem.js";
import Post from "../models/Posts.js";
import checkAdmin from "../middleware/checkAdmin.js";
import { validateLogin } from "../middleware/validation/validateLogin.js";
import { validateEmail } from "../middleware/validation/validateEmail.js";
import { validatePassword } from "../middleware/validation/validatePassword.js";
import { validateRole } from "../middleware/validation/validateRole.js";
import User from "../models/User.js";
import Category from "../models/Category.js";
import { validateTitle } from "../middleware/validation/validateTitle.js";
import { validateDescription } from "../middleware/validation/validateDescription.js";

router.use(authenticateAccessToken, checkAdmin);

//users
router.get("/users", UserController.getAll);
router.get("/users/:user_id", UserController.getById);

router.post("/users",
    validateLogin,
    validateEmail,
    validatePassword,
    validateRole,
    UserController.createUser
);

router.patch("/users/:user_id",
    checkItem(User, "user_id"),
    validateRole,
    UserController.updateUser
);

router.delete("/users/:user_id",
    checkItem(User, "user_id"),
    UserController.delete
);
//posts 
router.get("/posts/:post_id/categories", PostController.getCategories)
router.get("/posts/:post_id/like", PostController.getLikes);

router.patch("/posts/:post_id", 
    checkItem(Post, "post_id"),
    validateCategories,
    validateStatus, 
    PostController.updatePost
);

router.delete("/posts/:post_id",
    checkItem(Post, "post_id"),
    PostController.delete
);
//comments

//categories
router.post("/categories",
    validateTitle,
    validateDescription,
    CategoryController.createCategory
);
router.patch("/categories/:category_id",
    checkItem(Category, "category_id"),
    validateTitle,
    validateDescription,
    CategoryController.updateCategory
);
router.delete("/categories/:category_id",
    checkItem(Category, "category_id"),
    CategoryController.delete
);
//likes

export default router;