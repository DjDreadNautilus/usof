import express from "express";
const router = express.Router();

import Post from "../../models/Posts.js";
import PostController from "../../controllers/posts/PostController.js";

import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";
import { optionalAuth } from "../../middleware/auth/optionalAuth.js";

import { checkItem } from "../../middleware/checkItem.js";
import checkAuthor from "../../middleware/users/checkAuthor.js";
import { validateTitle } from "../../middleware/posts/validateTitle.js";
import { validateContent } from "../../middleware/posts/validateContent.js";
import { validateCategories } from "../../middleware/posts/validateCategories.js";
import { validateStatus } from "../../middleware/posts/validateStatus.js";

router.get("/", optionalAuth, 
    PostController.getAllFiltered
);

router.get("/:post_id", PostController.getById);
router.get("/:post_id/comments", PostController.getComments);
router.get("/:post_id/categories", PostController.getCategories);
router.get("/:post_id/like", PostController.getLikes)

router.post("/", 
    authenticateAccessToken, 
    validateTitle,
    validateContent,
    validateCategories, 
    PostController.createPost
);

router.post("/:post_id/comments", 
    authenticateAccessToken, 
    checkItem(Post, "post_id"),
    validateContent, 
    PostController.createComment
);

router.post("/:post_id/like",
    authenticateAccessToken,
    checkItem(Post, "post_id"),
    PostController.createLike
);

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

router.post("/:post_id",
    authenticateAccessToken,
    checkItem(Post, "post_id"),
    PostController.addFavorite
);

router.delete("/:post_id/like",
    authenticateAccessToken,
    checkItem(Post, "post_id"),
    PostController.deleteLike
);

router.delete("/:post_id", 
    authenticateAccessToken,
    checkItem(Post, "post_id"),
    checkAuthor(Post, "post_id"),
    PostController.delete);

export default router;