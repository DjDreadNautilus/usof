import express from "express";
const router = express.Router();

import CommentController from "../../controllers/posts/CommentController.js";
import { authenticateAccessToken } from "../../middleware/auth/authenticateAccessToken.js";

router.get("/:comment_id", CommentController.getById);
router.get("/:comment_id/like", CommentController.getLikes);

router.post("/:comment_id/like", authenticateAccessToken, CommentController.createLike);

router.patch("/:comment_id", CommentController.updateComment);

router.delete("/:comment_id", CommentController.delete);
router.delete("/:comment_id/like", CommentController.deleteLike);

export default router;