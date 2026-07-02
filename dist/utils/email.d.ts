export interface SendEmailOptions {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
export declare const sendEmail: (options: SendEmailOptions) => Promise<import("nodemailer/lib/smtp-transport").SentMessageInfo>;
