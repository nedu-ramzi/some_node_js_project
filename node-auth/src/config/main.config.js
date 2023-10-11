import { config as variableConfig } from 'dotenv';
import mongoose from 'mongoose';
variableConfig();

export const config = {
    server: {
        port: parseInt(process.env.PORT, 10),
        mode: process.env.NODE_ENV
    },
    connectToDatabase: async function(){
        await mongoose.connect(process.env.MONGODB_URI, {});

        mongoose.connection.on('error', e => console.error(`We encountered the following error while connecting to the database ${e.message}`));

        mongoose.connection.on('open',()=>console.info(`Connected to Mongoose Database`));
    },
    services: {
        mail: {
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            }
        },
        jwt: {
            expiresIn: '1hr',
            secret: process.env.JWT_SECRET
        }
    }
}