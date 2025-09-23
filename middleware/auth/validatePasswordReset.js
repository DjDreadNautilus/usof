import Validator from "../../services/Validator.js";
import ResetToken from "../../models/ResetToken.js";
import User from "../../models/User.js";

export async function validatePasswordReset(req, res, next) {
    const { confirm_token } = req.params;
    const { password, confirmation } = req.body;

    const token = await ResetToken.find({ token: confirm_token });

    if (!token) {
        return res.status(401).json({ error: "Reset token missing!" });
    }

    if (new Date(token.expiration_date).getTime() < Date.now()) {
        await token.delete();
        return res.status(403).json({ error: "Invalid or expired reset token" });
    }

    const user = await User.find({ email: token.user_email });
    if (!user) {
        await token.delete();
        return res.status(401).json({ error: "User with this email not found!" });
    }

    if (!Validator.isValidPassword(password)) {
        return res.status(400).json({ error: "Invalid password!" });
    }

    if (password !== confirmation) {
        return res.status(400).json({ error: "Passwords do not match!" });
    }

    await token.delete();

    req.user = user;
    next();
}