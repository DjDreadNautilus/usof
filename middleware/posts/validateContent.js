import Validator from "../../utils/Validator.js";

export function validateContent(req, res, next) {
    try {
        const { content } = req.body;

        if (content === undefined) return next();

        if (!Validator.isNonEmptyString(content)) {
            return res.status(400).json({ message: "Invalid content!" });
        }
        if (content.length < 10) {
            return res.status(400).json({ message: "Content must be at least 10 characters long." });
        }
        if (content.length > 500) {
            return res.status(400).json({ message: "Content is too long (longer than 500ch)" });
        }

        req.updates = req.updates || {};
        req.updates.content = content;
        next();
    } catch(err) {
        next(err);
    }
}