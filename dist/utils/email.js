"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_1 = require("../config/env");
const transporter = nodemailer_1.default.createTransport({
    host: env_1.env.EMAIL_HOST,
    port: env_1.env.EMAIL_PORT,
    secure: env_1.env.EMAIL_PORT === 465, // true for 465, false for other ports
    auth: {
        user: env_1.env.EMAIL_USER,
        pass: env_1.env.EMAIL_PASS ? env_1.env.EMAIL_PASS.replace(/^["']|["']$/g, '') : '', // strip quotes if any
    },
});
const sendEmail = async (options) => {
    const mailOptions = {
        from: `"Hossen Shop" <${env_1.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        text: options.text,
        html: options.html,
    };
    return transporter.sendMail(mailOptions);
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=email.js.map