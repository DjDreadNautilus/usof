import Validator from "../../services/Validator.js";
import User from "../../models/User.js";

export async function validateEmail(req, res, next) {
    try {
        const { email } = req.body;
        const { id: userId } = req.params;

        if (!email) return next();

        if (!Validator.isValidEmail(email)) {
            return res.status(400).json({ message: "Invalid email!" });
        }

        const existingEmails = await User.getAll({ email });
        if (existingEmails.some(u => u.id !== parseInt(userId))) {
            return res.status(400).json({ message: "Email already in use!" });
        }

        req.updates = req.updates || {};
        req.updates.email = email;
        next();
    } catch (err) {
        next(err);
    }
}
