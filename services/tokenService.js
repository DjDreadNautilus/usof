import jwt from "jsonwebtoken";
import "dotenv/config.js";
import RefreshToken from "../models/RefreshToken.js";
import Hash from "../services/Hash.js";

async function createRefreshToken(user) {
    const payload = {
        user_id: user.user_id,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    const refreshToken = new RefreshToken({
        user_id: user.user_id, 
        token: await Hash.hash(token, 10), 
        expiration_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    });

    await refreshToken.save();

    return token;
}

function createAccessToken(user) {
    const payload = {
        user_id: user.id,
        role: user.role,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "10m",
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    } catch (err) {
        return null;
    }
}

async function findTokensByUserID(userId) {
    return await RefreshToken.getAll({ user_id: userId });
}

export default {verifyToken, createAccessToken, findTokensByUserID, createRefreshToken}