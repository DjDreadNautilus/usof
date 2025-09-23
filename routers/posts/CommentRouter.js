import express from "express";
const router = express.Router();

import Comment from "../../models/Comment.js";

import CommentController from "../../controllers/posts/CommentController.js";

import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";

import { checkItem } from "../../middleware/validation/checkItem.js";
import checkAuthor from "../../middleware/checkAuthor.js";
import { validateContent } from "../../middleware/validation/validateContent.js";
import { validateStatus } from "../../middleware/validation/validateStatus.js";

router.get("/", CommentController.getAll);
router.get("/:comment_id", CommentController.getById);
router.get("/:comment_id/like", CommentController.getLikes);

router.post("/:comment_id/like", authenticateAccessToken, CommentController.createLike);

router.patch("/:comment_id",
    authenticateAccessToken, 
    checkItem(Comment, "comment_id"),
    checkAuthor(Comment),
    validateContent,
    validateStatus,
    CommentController.updateComment
);

router.delete("/:comment_id",
    authenticateAccessToken,
    checkItem(Comment, "comment_id"),
    checkAuthor(Comment), 
    CommentController.delete
);

router.delete("/:comment_id/like", CommentController.deleteLike);

export default router;  