import { config as dotenv } from "dotenv";
import mongoose, { MongooseError } from "mongoose";
import { logger } from '../helpers/logger.helpers';
import { v2 as cloudinary } from "cloudinary";

dotenv();
export const config = {
    server: {
        port: parseInt(process.env.PORT, 10),
        mode: process.env.NODE_ENV,
    },
    database: async () => {
        await mongoose.connect(process.env.MONGOOSE_URI, {
            autoIndex: false, // Don't build indexes
            maxPoolSize: 10, // Maintain up to 10 socket connections
            serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
            socketTimeoutMS: 50000, // Close sockets after 45 seconds of inactivity
            family: 4 // Use IPv4, skip trying IPv6
        });
        mongoose.connection.on('error', (e: MongooseError) => {
            console.log(`We encountered the following error while trying to connect to the database: ${e.message}`);
            logger.error('Failed to connect to database, Goodbye');
            process.exit(1);
        });
        mongoose.connection.on('open', () => {
            console.info('Mongo Database connection successful');
            logger.info('Connected to database');
        });
    },
    services: {
        jwt: {
            expiresIn: '24hr',
            secret: process.env.JWT_SECRET,
        },
        cloudinary: cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        })
    }
}
