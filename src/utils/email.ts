import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = nodemailer.createTransport({
  host: env.EMAIL_HOST,
  port: env.EMAIL_PORT,
  secure: env.EMAIL_PORT === 465, // true for 465, false for other ports
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS ? env.EMAIL_PASS.replace(/^["']|["']$/g, '') : '', // strip quotes if any
  },
});

export interface SendEmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export const sendEmail = async (options: SendEmailOptions) => {
  const mailOptions = {
    from: `"Hossen Shop" <${env.EMAIL_USER}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  return transporter.sendMail(mailOptions);
};
