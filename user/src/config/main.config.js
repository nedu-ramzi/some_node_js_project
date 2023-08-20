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