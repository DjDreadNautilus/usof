const Comment = require("../../models/Comment");
const Likable = require("../Likable");
const BaseController = require("../BaseController");

class CommentController extends Likable {
    constructor() {
        super(Comment, "comment_id");
    }

    async updateComment(req, res) {
        try {
            const id = req.params.comment_id;
            const comment = await Comment.find({ id: id });

            if (!comment) {
                return res.status(404).json({ error: "Comment not found" });
            }

            //validator potom napishy

            const updates = { ...req.body };

            await comment.update(updates);

            res.json({ status: "Success!", message: "Comment updated!" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new CommentController();