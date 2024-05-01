import nodemailer from 'nodemailer';
import {config as dotenv} from 'dotenv';
dotenv();

// Define the options object
const options = {
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '0'),
    secure: true,
    auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAIL_PASS
    }
};

export const transporter = nodemailer.createTransport(options);