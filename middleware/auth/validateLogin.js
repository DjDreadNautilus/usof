const User = require("../../models/User");
const Hash = require("../../services/Hash");

async function validateLogin(req, res, next) {
    const {login, password, email} = req.body;

    if (!login || !password || !email) {
        return res.status(400).send({error: "All fields are required!"});
    }

    const existingLogins = await User.getAll({ login: login });
    if (existingLogins.length <= 0) {
        return res.status(400).json({ message: "User with this login not found!" });
    }

    const existingEmails = await User.getAll({ email: email });
    if (existingEmails.length <= 0) {
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

module.exports = {validateLogin}