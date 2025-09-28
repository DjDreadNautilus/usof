import Validator from "../../utils/Validator.js";

export const validateTitle = async (req, res, next) => {
    try {
        const { title } = req.body;

        if (title === undefined) return next();

        if (!Validator.isNonEmptyString(title)) {
            return res.status(400).json({ message: "Invalid title!" });
        }
        if (title.length <= 3) {
            return res.status(400).json({ message: "Title must be at least 3 characters long." });
        }

        req.updates = req.updates || {};
        req.updates.title = title;
        next();
    } catch(err) {
        next(err);
    }
}