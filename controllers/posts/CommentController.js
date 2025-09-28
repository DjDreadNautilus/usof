import Comment from "../../models/Comment.js";
import { commentService } from "../../services/commentService.js";
import Likable from "../Likable.js";

class CommentController extends Likable {
    constructor() {
        super(Comment, "comment_id");
    }

    updateComment = async (req, res) => {
        try {
            const updates = req.updates;
            const item = req.item;

            const updatedComment = await commentService.updateComment(item, updates);

            res.status(200).json({updatedComment, message: "Comment updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CommentController();