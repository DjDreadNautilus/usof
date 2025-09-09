const JWT = require("../../services/JWT");

function authenticate(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(403).json({ message: "You're not logged in" });
    }

    try {
        req.user = JWT.verify(token, "KEY");
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

module.exports = {authenticate};