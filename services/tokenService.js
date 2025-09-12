const jwt = require('jsonwebtoken')
require("dotenv").config();
const RefreshToken = require("../models/RefreshToken")

async function createRefreshToken(user) {

	const payload = {
        user_id: user.user_id,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    const refreshToken = new RefreshToken({
        user_id: user.user_id, 
        token: token, 
        expiration_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    });

    await refreshToken.save();

    return token;
}

function createAccessToken(user) {
    const payload = {
        user_id: user.user_id,
        role: user.role,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s", 
    });
}

async function terminateToken(token) {
    const refreshToken = await RefreshToken.find({token: token});

    await refreshToken.delete(); 
}

module.exports = {createAccessToken, createRefreshToken, terminateToken};