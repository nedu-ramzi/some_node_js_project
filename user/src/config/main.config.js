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
            name: process.env.SERVICE_NAME,
            user: process.env.MAILER_USER,
            pass: process.env.MAILER_PASS
        }
    }
}