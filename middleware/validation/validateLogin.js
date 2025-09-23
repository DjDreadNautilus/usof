import Validator from "../../services/Validator.js";
import User from "../../models/User.js";

export async function validateLogin(req, res, next) {
    try {
        const { login } = req.body;
        const { id: userId } = req.params;

        if (!login) return next();

        if (!Validator.isValidLogin(login)) {
            return res.status(400).json({ message: "Invalid login!" });
        }

        const existingLogins = await User.getAll({ login });
        if (existingLogins.some(u => u.id !== parseInt(userId))) {
            return res.status(400).json({ message: "Login already in use!" });
        }

        req.updates = req.updates || {};
        req.updates.login = login;
        next();
    } catch (err) {
        next(err);
    }
}