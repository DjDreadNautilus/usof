import jwt from "jsonwebtoken";
import User from "../../models/User.js";

export async function authenticateAccessToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ error: "Access token missing" });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: "Invalid or expired access token" });
        }

        const user = await User.find({id: decoded.user_id});
        if(!user) {
            return res.status(403).json({ error: "User not found" });
        }

        req.user = decoded;
        console.log("Decoded token:", req.user);
        next();
    });
}