import express from 'express';
import http from 'http';
import compression from 'compression';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

import { config } from './config/main.config';
import router from './routes';

const app = express();
const server = http.createServer(app) 

//middleware
app.use(compression());
app.use(cors({
    credentials : true,
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan("dev"));

//route set up
app.use('api/v1', router());

//database connection
config.database();

//server port
server.listen(config.server.port, ()=>{
    console.log(`Application listening on port ${config.server.port}`);
})