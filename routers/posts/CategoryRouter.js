import express from "express";
const router = express.Router();
import Category from "../../models/Category.js";

import CategoryController from "../../controllers/posts/CategoryController.js";

import { checkItem } from "../../middleware/checkItem.js";

router.get("/", CategoryController.getAll);
router.get("/:category_id", CategoryController.getById);
router.get("/:category_id/posts", 
    checkItem(Category, "category_id"),
    CategoryController.getPosts
);

export default router;