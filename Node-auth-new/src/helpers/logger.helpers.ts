import { config as dotenv } from "dotenv";
import winston from 'winston';

dotenv();
// Winston logger
export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: process.env.APP_NAME },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'info.log', level: 'info' }),
        new winston.transports.File({ filename: 'combined.log' }),
    ],
});

// export default logger;
