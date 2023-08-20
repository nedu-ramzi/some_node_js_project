import * as dotenv from "dotenv";
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
            secret: process.env.JWT_SECRET,
            expires: '2h'
        }
    }

}