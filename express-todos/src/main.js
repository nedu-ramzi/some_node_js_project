// import dependencies
import express from 'express';
import morgan from 'morgan';
import config from './config/main.config.js';
import router from './routes/main.routes.js';
import connectToDatabase from './database/config.database.js';

// configure application
const app = express();

// define middleware
app.use(express.json())
app.use(morgan("dev"))

// define routes
app.use('/api/v1', router);

// connect to database
connectToDatabase(config);

// start application
app.listen(config.server.port, () =>
  console.info(`🚀  Application running at localhost:${config.server.port} 🚀`)
);