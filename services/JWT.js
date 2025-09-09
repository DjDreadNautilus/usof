const jwt = require('jsonwebtoken')

function jwtGenerator(id, login, email, role) {
    const token = jwt.sign(
        {id: id, login: login, email: email, role: role}, 
        "KEY",
        {expiresIn: "12h"}
    )
    return token;
}

module.exports = {jwtGenerator};