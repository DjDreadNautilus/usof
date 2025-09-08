const Validator = require("../../services/Validator");
const User = require("../../models/User");

async function validateSignup(req, res, next) {
    const {login, fullname, password, confirmation, email} = req.body;

    if (!login || !fullname || !password || !email) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    if(!Validator.is_valid_login(login)) {
        return res.status(400).json({ error: "Invalid login!" });
    }

    if(!Validator.is_valid_password(password)) {
        return res.status(400).json({ error: "Invalid password!" });
    }

    if (password !== confirmation) {
        return res.status(400).json({ error: "Passwords do not match!" });
    }

    const lookup = await User.getAll({login, email});

    if(lookup.length > 0) {
        return res.status(400).send({error: "User with this login/email already exists!"});
    }

    next();
}

module.exports = {validateSignup}