import * as dotenv from 'dotenv';
dotenv.config();

export const config = {
    server: {
        port: parseInt(process.env.PORT),
    },
    db: {
        uri: process.env.MONGODB_URI,
    },
    services: {
        jwt: {
            secret: process.env.JWT_SECRET
        },
        mailer: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS,
            secure: true
        }
    }
}
export const SERVICE_URL = process.env.SERVICE_URL; 
export const JWT_SECRET = process.env.JWT_SECRET;
export const FROM_EMAIL = process.env.FROM_EMAIL;
export const FROM_NAME = process.env.FROM_NAME;

