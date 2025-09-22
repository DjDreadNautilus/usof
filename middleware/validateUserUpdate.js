import Validator from "../services/Validator.js";
import User from "../models/User.js";

export async function validateUserUpdate(req, res, next) {
    try {
        const {login, email, password} = req.body;
        const { id: userId } = req.params;

        let updates = {};

        if (login) {
            if (!Validator.isValidLogin(login)) {
                return res.status(400).json({ message: "Invalid login!" });
            }

            const existingLogins = await User.getAll({ login: login });
            if (existingLogins.some(u => u.id !== parseInt(userId))) {
                return res.status(400).json({ message: "Login already in use!" });
            }
            updates.login = login;
        }

        if (email) {
            if (!Validator.isValidEmail(email)) {
                return res.status(400).json({ error: "Invalid email!" });
            }

            const existingEmails = await User.getAll({ email: email });
            if (existingEmails.some(u => u.id !== parseInt(userId))) {
                return res.status(400).json({ message: "Email already in use!" });
            }
            updates.email = email;
        }

        if (password) {
            if (!Validator.isValidPassword(password)) {
                return res.status(400).json({ message: "Invalid password!" });
            }
            updates.password = password;
        }

        req.updates = updates;
        next();
    } catch (err) {
        next(err);
    }
}