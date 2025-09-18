const express = require("express");
const router = express.Router();
const CommentController = require("../../controllers/posts/CommentController");
const {authenticateAccessToken} = require("../../middleware/auth/authenticateAccessToken");

router.get("/:comment_id", CommentController.getById);
router.get("/:comment_id/like", CommentController.getLikes);

router.post("/:comment_id/like", authenticateAccessToken, CommentController.createLike);

router.patch("/:comment_id", CommentController.updateComment);

router.delete("/:comment_id", CommentController.delete);
router.delete("/:comment_id/like", CommentController.deleteLike);

module.exports = router;