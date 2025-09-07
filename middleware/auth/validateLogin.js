const User = require("../../models/User");
const Hash = require("../../services/Hash");

async function validateLogin(req, res, next) {
    const {login, password, email} = req.body;

    if (!login || !password || !email) {
        return res.status(400).send({error: "All fields are required!"});
    }

    const lookup = await User.getAll({login, email});

    if(lookup.length === 0) {
        return res.status(400).send({error: "User with this login/email not found!"});
    }

    const user = lookup[0];

    const isMatch = await Hash.compareHash(password, user.password);
    
    if (!isMatch) {
        return res.status(400).send({ error: "Incorrect password!" });
    }

    next();
}

module.exports = {validateLogin}