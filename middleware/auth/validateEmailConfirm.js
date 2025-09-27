import ResetToken from "../../models/ResetToken.js";
import User from "../../models/User.js";

export const validateEmailConfirm =  async (req, res, next) => {
    const { confirm_token } = req.params;

    const token = await ResetToken.find({ token: confirm_token });

    if (!token) {
        return res.status(401).json({ error: "Reset token missing!" });
    }

    if (new Date(token.expiration_date).getTime() < Date.now()) {
        await token.delete();
        return res.status(403).json({ error: "Invalid or expired token" });
    }

    const user = await User.find({ email: token.user_email });
    if (!user) {
        await token.delete();
        return res.status(401).json({ error: "User with this email not found!" });
    }

    await token.delete();

    req.user = user;
    next();
}