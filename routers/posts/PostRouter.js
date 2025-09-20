import express from "express";
const router = express.Router();

import PostController from "../../controllers/posts/PostController.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";

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

export default router;