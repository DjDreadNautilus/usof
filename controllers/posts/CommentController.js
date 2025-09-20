import Comment from "../../models/Comment.js";
import Likable from "../Likable.js";

class CommentController extends Likable {
    constructor() {
        super(Comment, "comment_id");
    }

    async updateComment(req, res) {
        try {
            const { comment_id } = req.params;
            const comment = await Comment.find({ id: comment_id });

            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            const updates = { ...req.body };
            await comment.update(updates);

            res.json({ status: "Success!", message: "Comment updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CommentController();