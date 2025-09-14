const Validator = require("../services/Validator");
const User = require("../models/User")

async function validateUserUpdate(req, res, next) {
    const params = { ...req.body };
    const userId = req.params.id; 

    if (params.login) {
        const existingLogins = await User.getAll({ login: params.login });
        if (existingLogins.some(u => u.id !== parseInt(userId))) {
            return res.status(400).json({ message: "Login already in use!" });
        }
    }

    if (params.email) {
        if(!Validator.isValidEmail(email)) {
            return res.status(400).json({error: "Invalid email"});
        }

        const existingEmails = await User.getAll({ email: params.email });
        if (existingEmails.some(u => u.id !== parseInt(userId))) {
            return res.status(400).json({ message: "Email already in use!" });
        }
    }

    if (!Validator.isValidLogin(params.login)) {
        return res.status(400).json({ message: "Invalid login!" });
    }

    if (params.password) {
        if (!Validator.isValidPassword(params.password)) {
            return res.status(400).json({ message: "Invalid password!" });
        }
    }

    next(); 
}

module.exports = {validateUserUpdate}