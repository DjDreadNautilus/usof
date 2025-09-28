import nodemailer from "nodemailer";
import "dotenv/config.js";

export const mailService = {

    sendMail: async (email, subject, text, html) => {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: 587,
            secure: false, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        await transporter.sendMail({
            from: `"App support" <${process.env.SMTP_USER}>`, 
            to: email, 
            subject: subject,
            text: text,
            html: html,
        });
    },
}