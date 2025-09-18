const jwt = require("jsonwebtoken");

function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ error: "Access token missing" });

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) return res.status(403).json({ error: "Invalid or expired access token" });

        req.user = decoded; 
        console.log("Decoded token:", req.user);
        next();
    });
}

module.exports = {authenticateAccessToken}