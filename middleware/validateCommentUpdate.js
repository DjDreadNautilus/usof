import Validator from "../services/Validator.js";
import Comment from "../models/Comment.js";

export async function validateCommentUpdate(req, res, next) {
    try {
        const { comment_id } = req.params;
        const user = req.user;
        const { content, status } = req.body;

        const comment = await Comment.find({ id: comment_id });
        if (!post) {
            return res.status(404).json({ message: "Comment not found" });
        }

        let updates = {};

        if (content !== undefined) {
            if (!Validator.isNonEmptyString(content)) {
                return res.status(400).json({ message: "Invalid content!" });
            }
            if (content.length < 5) {
                return res.status(400).json({ message: "Content must be at least 10 characters long." });
            }
            if (content.length > 500) {
                return res.status(400).json({ message: "Content is too long ( longer that 500ch)" });
            }
            
            updates.content = content;  
        }

        if (status !== undefined) { 
            if (!["active", "inactive"].includes(status)) {
                return res.status(400).json({ message: "Invalid status value" });
            }
            updates.status = status;
        }

        req.updates = updates;
        req.comment = comment;
        next();
    } catch (err) {
        next(err);
    }
}

export default validateCommentUpdate;