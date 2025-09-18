const express = require("express");
const router = express.Router();
const PostController = require("../../controllers/posts/PostController");

const {authenticateAccessToken} = require("../../middleware/auth/authenticateAccessToken");

router.get("/", PostController.getAll);
router.get("/:category_id", PostController.getById);
router.get("/:post_id/categories", PostController.getCategories)
router.get("/:post_id/comments", PostController.getComments);
router.get("/:post_id/like", PostController.getLikes);

router.post("/", authenticateAccessToken, PostController.createPost);
router.post("/:post_id/comments", authenticateAccessToken, PostController.createComment);
router.post("/:post_id/like", authenticateAccessToken, PostController.createLike);

router.delete("/:post_id/like", authenticateAccessToken, PostController.deleteLike);
router.delete("/:post_id", PostController.delete);

module.exports = router;