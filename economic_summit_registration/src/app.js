import express from "express";
import morgan from 'morgan';
import { config } from './config/main.config.js';
import { dbcon } from './database/database.config.js';
import {router} from './router/user.router.js';
const app = express();

//middleware
app.use(morgan("dev"));
app.use(express.json());

//router
app.use('/', router);


dbcon(config);
app.listen(config.server.port, ()=>{
    console.log(`Application running on port ${config.server.port}`);
});