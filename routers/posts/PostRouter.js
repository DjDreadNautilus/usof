import express from "express";
const router = express.Router();

import PostController from "../../controllers/posts/PostController.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";
import Post from "../../models/Posts.js";

import { validateTitle } from "../../middleware/validation/validateTitle.js";
import { validateContent } from "../../middleware/validation/validateContent.js";
import { validateCategories } from "../../middleware/validation/validateCategories.js";
import { validateStatus } from "../../middleware/validation/validateStatus.js";

import { checkItem } from "../../middleware/validation/checkItem.js";
import checkAuthor from "../../middleware/checkAuthor.js";

router.get("/", PostController.getAll);
router.get("/:post_id", PostController.getById);
router.get("/:post_id/comments", PostController.getComments);

router.post("/", 
    authenticateAccessToken, 
    validateTitle,
    validateContent,
    validateCategories, 
    PostController.createPost
);

router.post("/:post_id/comments", 
    authenticateAccessToken, 
    validateContent, 
    PostController.createComment
);

router.post("/:post_id/like", authenticateAccessToken, PostController.createLike);

router.patch("/:post_id",
    authenticateAccessToken,
    checkItem(Post, "post_id"),
    checkAuthor(Post),
    validateTitle,
    validateContent,
    validateCategories,
    validateStatus,
    PostController.updatePost
);

router.delete("/:post_id/like", authenticateAccessToken, PostController.deleteLike);

router.delete("/:post_id", 
    authenticateAccessToken,
    checkItem(Post, "post_id"),
    checkAuthor(Post, "post_id"),
    PostController.delete);

export default router;