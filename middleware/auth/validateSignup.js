import Validator from "../../services/Validator.js";
import User from "../../models/User.js";

export async function validateSignup(req, res, next) {
    console.log(req.body);
    const { login, fullname, password, confirmation, email } = req.body;

    if (!login || !fullname || !password || !email) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    if (!Validator.isValidLogin(login)) {
        return res.status(400).json({ error: "Invalid login!" });
    }

    if (!Validator.isValidPassword(password)) {
        return res.status(400).json({ error: "Invalid password!" });
    }

    if (!Validator.isValidEmail(email)) {
        return res.status(400).json({ error: "Invalid email!" });
    }

    if (password !== confirmation) {
        return res.status(400).json({ error: "Passwords do not match!" });
    }

    const existingLogins = await User.getAll({ login });
    if (existingLogins.length > 0) {
        return res.status(400).json({ message: "Login already in use!" });
    }

    const existingEmails = await User.getAll({ email });
    if (existingEmails.length > 0) {
        return res.status(400).json({ message: "Email already in use!" });
    }

    next();
}