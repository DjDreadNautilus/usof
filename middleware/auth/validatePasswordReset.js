const Validator = require("../../services/Validator");
const ResetToken = require("../../models/ResetToken");
const User = require("../../models/User");

async function validatePasswordReset(req, res, next) {
    const confirmToken = req.params.confirm_token;
    const password = req.body.password;
    const confirmation = req.body.confirmation

    const token = await ResetToken.find({token: confirmToken});
    
    if(!token) {
        return res.status(401).json({error: "Reset token missing!"});
    }

    if (new Date(token.expiration_date).getTime() < Date.now()) {
        token.delete();
        return res.status(403).json({ error: "Invalid or expired reset token" });
    }

    const user = await User.find({email: token.user_email});
    if(!user) {
        token.delete();
        return res.status(401).json({error: "User with this email not found!"});
    }

    if(!Validator.isValidPassword(password)) {
        return res.status(400).json({error: "Invalid password!"});
    }

    if(password !== confirmation) {
        return res.status(400).json({error: "Passwords do not match!"});
    }

    token.delete();

    req.user = user;
    next();
}

module.exports = {validatePasswordReset};