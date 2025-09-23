import express from "express";
const router = express.Router();

import CategoryController from "../../controllers/posts/CategoryController.js";

router.get("/", CategoryController.getAll);
router.get("/:category_id", CategoryController.getById);
router.get("/:category_id/posts", CategoryController.getPosts);

export default router;