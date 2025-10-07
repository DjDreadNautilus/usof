import Hash from "../../utils/Hash.js";
import User from "../../models/User.js";
import { mailService } from "../../services/mailService.js";
import tokenService from "../../services/tokenService.js";

class resetPasswordController {
    sendResetMail = async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.find({ email });
            if (!user) {
                return res.status(400).json({ message: "User not found" });
            }

            const token = await tokenService.createResetToken(email);

            const link = `http://localhost:8080/auth/password-reset/${token.token}`;

            const subject = "Password restoration";
            const text = `Restoration link: ${link}`;
            const html = `<b>Restoration link: ${link}</b>`;

            await mailService.sendMail(email, subject, text, html);

            res.status(200).json({ message: "Reset message sent!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    resetPassword = async (req, res) => {
        try {
            const { password } = req.body;
            const user = req.user;

            const hashedPassword = await Hash.hash(password, 10);

            await user.update({ password: hashedPassword });

            res.status(200).json({ message: "Password reset!" });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

export default new resetPasswordController();