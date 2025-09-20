import express from "express";
const router = express.Router();

import CategoryController from "../../controllers/posts/CategoryController.js";

router.get("/", CategoryController.getAll);
router.get("/:category_id", CategoryController.getById);
router.get("/:category_id/posts", CategoryController.getPosts);
router.post("/", CategoryController.createCategory);

router.patch("/:category_id", CategoryController.updateCategory);
router.delete("/:category_id", CategoryController.delete);

export default router;