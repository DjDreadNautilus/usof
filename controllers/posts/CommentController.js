import Comment from "../../models/Comment.js";
import Likable from "../Likable.js";

class CommentController extends Likable {
    constructor() {
        super(Comment, "comment_id");
    }

    updateComment = async (req, res) => {
        try {
            const updates = req.updates;
            const item = req.item;

            await item.update(updates);

            res.json({ status: "Success!", message: "Comment updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

export default new CommentController();