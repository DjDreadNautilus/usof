const express = require("express");
const router = express.Router();
const PostController = require("../../controllers/posts/PostController");

const {authenticateAccessToken} = require("../../middleware/auth/authenticateAccessToken");

router.get("/", PostController.getAll);
router.get("/:category_id", PostController.getById);
router.get("/:post_id/categories", PostController.getCategories)
router.post("/", authenticateAccessToken, PostController.createPost);


module.exports = router;