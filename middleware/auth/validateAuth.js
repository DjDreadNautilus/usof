import User from "../../models/User.js";
import Hash from "../../utils/Hash.js";

export async function validateAuth(req, res, next) {
    const { login, password, email } = req.body;

    if (!login || !password || !email) {
        return res.status(400).send({ error: "All fields are required!" });
    }

    const existingLogins = await User.getAll({ login });
    if (existingLogins.length === 0) {
        return res.status(400).json({ message: "User with this login not found!" });
    }

    const existingEmails = await User.getAll({ email });
    if (existingEmails.length === 0) {
        return res.status(400).json({ message: "User with this email not found!" });
    }

    const user = existingLogins[0];
    const isMatch = await Hash.compareHash(password, user.password);

    if (!isMatch) {
        return res.status(400).send({ error: "Incorrect password!" });
    }

    req.user = user;
    next();
}