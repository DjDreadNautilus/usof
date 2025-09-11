const jwt = require('jsonwebtoken')
require("dotenv").config();
const RefreshToken = require("../models/RefreshToken")

async function createRefreshToken(userdata) {
    const token = jwt.sign(userdata, process.env.REFRESH_TOKEN_SECRET);
    const refreshToken = new RefreshToken({
        user_id: userdata.user_id, 
        token: token, 
        expiration_date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000)
    });

    await refreshToken.save();

    return token;
}

function createAccessToken(user) {
    const payload = {
        id: user.id,
        role: user.role,
    };

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "15s", 
    });
}

async function refreshAccessToken(refreshToken) {
  try {

    const user = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const storedToken = await RefreshToken.find({ token: refreshToken });
    if (!storedToken) {
        throw new Error("Refresh token not found");
    }

    if (storedToken.expiration_date < new Date()) {
        await terminateToken(storedToken);
        throw new Error("Refresh token expired");
    }

    const newAccessToken = createAccessToken({ user_id: user.user_id, role: user.role });

    return { accessToken: newAccessToken };
  } catch (err) {
    throw new Error("Invalid refresh token");
  }
}

async function terminateToken(token) {
    const refreshToken = await RefreshToken.find({token: token});

    await refreshToken.delete(); 
}

module.exports = {createAccessToken, createRefreshToken, terminateToken, refreshAccessToken};