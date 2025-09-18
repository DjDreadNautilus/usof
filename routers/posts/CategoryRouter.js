const express = require("express");
const router = express.Router();
const CategoryController = require("../../controllers/posts/CategoryController");

router.get("/", CategoryController.getAll);
router.get("/:category_id", CategoryController.getById);
router.get("/:category_id/posts", CategoryController.getPosts);
router.post("/", CategoryController.createCategory);

router.patch("/:category_id", CategoryController.updateCategory);
router.delete("/:category_id", CategoryController.delete);

module.exports = router;