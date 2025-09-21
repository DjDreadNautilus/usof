import tokenService from "../../services/tokenService.js";
import Hash from "../../services/Hash.js";
import User from "../../models/User.js";

class AuthController {
    login = async (req, res) => {
        try {
            const refreshToken = await tokenService.createRefreshToken({ user_id: req.user.id, role: req.user.role });
            const accessToken = tokenService.createAccessToken(req.user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 10 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({ message: "Logged in!", accessToken });
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).json({ error: "Internal Server Error!" });
        }
    }

    signup = async (req, res) => {
        try {
            const { login, fullname, password, email } = req.body;

            const hashedPassword = await Hash.hash(password, 10);
            const user = new User({ login, fullname, password: hashedPassword, email, role: "user", rating: 0 });
            await user.save();

            res.status(200).json({ message: "Registered!" });
        } catch (err) {
            console.error("Error during signup:", err);
            res.status(500).json({ error: "Internal Server Error!" });
        }
    }

    logout = async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.status(400).json({ error: "No refresh token provided" });

            const user = await tokenService.verifyToken(refreshToken);

            const tokens = await tokenService.findTokensByUserID(user.user_id);

            let storedToken = null;
            for (const token of tokens) {
                const isMatch = await Hash.compareHash(refreshToken, token.token);
                if (isMatch) {
                    storedToken = token;
                    break;
                }
            }

            if (storedToken) {
                await storedToken.delete();
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
    }
}

export default new AuthController();