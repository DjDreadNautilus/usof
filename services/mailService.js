import nodemailer from "nodemailer";

export const mailService = {

    sendMail: async (email, subject, text, html) => {
        const transporter = nodemailer.createTransport({
            host: "smtp.mailersend.net",
            port: 587,
            secure: false, 
            auth: {
                user: "MS_jV2Bbi@test-2p0347zknqplzdrn.mlsender.net",
                pass: "mssp.cG5ypz8.pr9084zpr08gw63d.PIZvLbv",
            },
        });

        await transporter.sendMail({
            from: '"App support" <MS_jV2Bbi@test-2p0347zknqplzdrn.mlsender.net>', 
            to: email, 
            subject: subject,
            text: text,
            html: html,
        });
    },
}