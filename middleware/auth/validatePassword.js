import Validator from "../../utils/Validator.js";

export async function validatePassword(req, res, next) {
    try {
        const { password } = req.body;

        if (!password) return next();

        if (!Validator.isValidPassword(password)) {
            return res.status(400).json({ message: "Invalid password!" });
        }

        req.updates = req.updates || {};
        req.updates.password = password;
        next();
    } catch (err) {
        next(err);
    }
}