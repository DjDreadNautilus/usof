import tokenService from "../../services/tokenService.js";
import Hash from "../../utils/Hash.js";
import { userService } from "../../services/userService.js";
import { mailService } from "../../services/mailService.js";

class AuthController {
    login = async (req, res) => {
        try {
            const user = req.user;

            if(!user.verified) {
                return res.status(400).json({message: "Unverified email, try again!"});
            }

            const refreshToken = await tokenService.createRefreshToken({ user_id: user.id, role: user.role });
            const accessToken = tokenService.createAccessToken(req.user);

            res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "Strict",
                maxAge: 10 * 24 * 60 * 60 * 1000
            });

            res.status(200).json({ message: "Logged in!", accessToken });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    signup = async (req, res) => {
        try {
            const { login, password, email } = req.updates;
            const {fullname, confirmation} = req.body;

            if(password !== confirmation) {
                return res.status(400).json({message: "Passwords do not match"});
            }

            const user = await userService.createUser(login, fullname, password, email, false);
            
            const token = await tokenService.createResetToken(email);

            const link = `http://localhost:8080/api/auth/email-confirm/${token.token}`
            const subject = "Email conformation";
            const text = `Confirm email: ${link}`;
            const html = `<b>Confirmation link: ${link}</b>`

            await mailService.sendMail(email, subject, text, html);

            res.status(200).json({user, message: "Registered! Check your mailbox to confirm email!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    logout = async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) return res.status(400).json({ message: "No refresh token provided" });

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
            res.status(500).json({ message: err.message });
        }
    }

    confirmEmail = async (req, res) => {
        try {
            const user = req.user;

            await userService.updateUser(user, {verified: true});

            res.status(200).json({ message: "User verified!" });
        } catch(err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default new AuthController();