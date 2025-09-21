import express from "express";
const router = express.Router();

import PostController from "../../controllers/posts/PostController.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";
import { validatePostCreate } from "../../middleware/validatePostCreate.js";
import { validatePostUpdate } from "../../middleware/validatePostUpdate.js";
import checkRights from "../../middleware/checkRights.js";
import Post from "../../models/Posts.js";

router.get("/", PostController.getAll);
router.get("/:category_id", PostController.getById);
router.get("/:post_id/categories", PostController.getCategories)
router.get("/:post_id/comments", PostController.getComments);
router.get("/:post_id/like", PostController.getLikes);

router.post("/", authenticateAccessToken, validatePostCreate, PostController.createPost);
router.post("/:post_id/comments", authenticateAccessToken, PostController.createComment);
router.post("/:post_id/like", authenticateAccessToken, PostController.createLike);

router.patch("/:post_id", authenticateAccessToken, checkRights(Post, "post_id"), validatePostUpdate, PostController.updatePost);

router.delete("/:post_id/like", authenticateAccessToken, checkRights(Post, "post_id"), PostController.deleteLike);
router.delete("/:post_id", authenticateAccessToken, checkRights(Post, "post_id"), PostController.delete);

export default router;