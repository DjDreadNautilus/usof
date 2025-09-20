import Validator from "../services/Validator.js";
import User from "../models/User.js";

export async function validateUserUpdate(req, res, next) {
    try {
        const params = { ...req.body };
        const { id: userId } = req.params;

        if (params.login) {
            if (!Validator.isValidLogin(params.login)) {
                return res.status(400).json({ message: "Invalid login!" });
            }

            const existingLogins = await User.getAll({ login: params.login });
            if (existingLogins.some(u => u.id !== parseInt(userId))) {
                return res.status(400).json({ message: "Login already in use!" });
            }
        }

        if (params.email) {
            if (!Validator.isValidEmail(params.email)) {
                return res.status(400).json({ error: "Invalid email!" });
            }

            const existingEmails = await User.getAll({ email: params.email });
            if (existingEmails.some(u => u.id !== parseInt(userId))) {
                return res.status(400).json({ message: "Email already in use!" });
            }
        }

        if (params.password) {
            if (!Validator.isValidPassword(params.password)) {
                return res.status(400).json({ message: "Invalid password!" });
            }
        }

        next();
    } catch (err) {
        next(err);
    }
}