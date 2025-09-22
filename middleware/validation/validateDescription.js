import Validator from "../../services/Validator.js";

export const validateDescription = (req, res, next) => {
    try {
        const { description } = req.body;

        if (description === undefined) return next();

        if (description !== "" && !Validator.isNonEmptyString(description)) {
            return res.status(400).json({ message: "Invalid description!" });
        }

        req.updates = req.updates || {};
        req.updates.description = description;

        next();
    } catch (err) {
        next(err);
    }
};
