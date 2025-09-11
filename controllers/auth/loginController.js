const tokenService = require("../../services/tokenService");

const loginController = {

    getLogin: () => {
        res.send("Login form page");
    },
    
    login: async (req, res) => {
        try {
            const refreshToken = await tokenService.createRefreshToken({user_id: req.user.id, role: req.user.role});
            const accessToken = tokenService.createAccessToken(req.user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,   
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 10 * 24 * 60 * 60 * 1000
            })

            res.json({
                status: "Success!", 
                accessToken: accessToken
            });

        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).send({error: "Internal Server Error!"});
        }
    },

    logout: async (req, res) => {
        try {
            const token = req.cookies.refreshToken;
            if (token) {
                await tokenService.terminateToken(token);
            }
            
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict"
            });

            res.status(200).json({ message: "You were logged out" });
        } catch (err) {
            console.error("Error during logout:", err);
            res.status(500).json({ error: "Internal Server Error!" });
        }
    },

    refreshToken: async (req, res) => {
        try {
            const token = req.cookies.refreshToken;
            if (!token) return res.status(401).json({ error: "No refresh token provided" });

            const newAccessToken = await tokenService.refreshAccessToken(token);
            res.json({ accessToken: newAccessToken });
        } catch (err) {
            console.error(err);
            res.status(403).json({ error: "Invalid refresh token" });
        }
    }
}

module.exports = loginController;
