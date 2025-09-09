const jwt = require('jsonwebtoken')

function jwtGenerator(params = {}) {
    const token = jwt.sign(
        params, 
        "KEY",
        {expiresIn: "12h"}
    )
    return token;
}

module.exports = {
    jwtGenerator,
    verify: (token) => jwt.verify(token, "KEY")
};