const Validator = require("../services/Validator");

async function validateUserUpdate(req, res, next) {
    const { login, fullname, password, confirmation, email, role } = req.body;

    if(!Validator.is_valid_login(login)) {
        return res.status(400).json({ error: "Invalid login!" });
    }

    if(!Validator.is_valid_password(password)) {
        return res.status(400).json({ error: "Invalid password!" });
    }

    if(password !== confirmation) {
        return res.status(400).send({error: "Passwords not match!"});
    }

    const lookup = await User.getAll({login, email});

    if(lookup.length === 0) {
        return res.status(400).send({error: "User with this login/email not found!"});
    }

    next();
}

module.exports = {validateUserUpdate}