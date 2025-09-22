    import Validator from "../services/Validator.js";

    export async function validateCommentCreate(req, res, next) {
        try {
            const {content} = req.body;

            if (!content) {
                return res.status(400).json({ message: "content are required!" });
            }

            if (content !== undefined) {
                if (!Validator.isNonEmptyString(content)) {
                    return res.status(400).json({ message: "Invalid content!" });
                }
                if (content.length < 10) {
                    return res.status(400).json({ message: "Content must be at least 10 characters long." });
                }
                if (content.length > 500) {
                    return res.status(400).json({ message: "Content is too long ( longer that 500ch)" });
                }
            }

            const commentData = {
                content,
            };

            req.commentData = commentData;

            next();
        } catch (err) {
            next(err);
        }
    }

    export default validateCommentCreate;