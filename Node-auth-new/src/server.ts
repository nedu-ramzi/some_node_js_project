import { Server } from 'http';
import 'express-async-errors';
import { config } from './config/config.main';
import { logger } from './helpers/logger.helpers';
import app from './app';


// setting up server
const server: Server = app.listen(config.server.port, async () => {
    await config.database();
    console.log(`Server Running on port ${config.server.port}`);
    logger.info(`Server running on port ${config.server.port}`);
});

// handle unhanled promise rejections
process.on('unhandledRejection', (err) => {
    console.log(err);

    // close server
    server.close(() => process.exit(1));
});