const nodemailer = require("nodemailer");
const crypto = require("crypto");
const Hash = require("../../services/Hash");
const User = require("../../models/User");
const ResetToken = require("../../models/ResetToken");

const resetPasswordController = {
    sendResetMail: async (req, res) => {
        try {
            const {email} = req.body;

            const user = await User.find({email: email});

            if(!user) {
                return res.status(400).json({ error: "User not found" });
            }

            const token = new ResetToken({
                token: crypto.randomBytes(64).toString("hex"),
                user_email: email,
                expiration_date: new Date(Date.now() + 15 * 60 * 1000)
            });
            
            token.save();

            const link = `http://localhost:8080/auth/password-reset/${token.token}`;

            const transporter = nodemailer.createTransport({
                host: "smtp.mailersend.net",
                port: 587,
                secure: false, 
                auth: {
                    user: "MS_jV2Bbi@test-2p0347zknqplzdrn.mlsender.net",
                    pass: "mssp.cG5ypz8.pr9084zpr08gw63d.PIZvLbv",
                },
            });

            const info = await transporter.sendMail({
                from: '"App support" <MS_jV2Bbi@test-2p0347zknqplzdrn.mlsender.net>', 
                to: email, 
                subject: "Password restoration",
                text: `Restoration link: ${link}`,
                html: `<b>Restoration link: ${link}</b>`,
            });

            res.status(200).json({message: "Reset message sent!"});
        } catch(err) {
            console.error("Error during message sending:", err);
            res.status(500).json({ error: "Internal Server Error!" });
        }


    },

    resetPassword: async (req, res) => {
        try {
            const password = req.body.password;
            const user = req.user;

            const hashedPassword = await Hash.hash(password, 10);
            await user.update({password: hashedPassword});

            res.status(200).json({message: "Password reset!"});
        } catch(err) {
            console.error("Error during password reset:", err);
            res.status(500).json({ error: "Internal Server Error!" });
        }

    }
}

module.exports = resetPasswordController;