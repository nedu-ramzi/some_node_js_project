import express from 'express';
import http from 'http';
import url from "url";
import { join } from "path";
import morgan from 'morgan';
import mongoose from 'mongoose';
import cors from 'cors';

import { config as dotenv } from 'dotenv';
import { router as productsRoutes } from './routers/products.js';
import { router as categoriesRoutes } from './routers/categories.js';
import { router as ordersRoutes } from './routers/orders.js';
import { router as userRoutes } from './routers/users.js';
import { router as authRoutes } from './routers/auth.user.js';
import { errrorHandler } from './helpers/error.handlers.js';
import { authMiddleware, adminAuth } from './middleware/auth.middleware.js'
dotenv();

const api = process.env.API_URL;

const app = express();

const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

//middleware
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());
app.use('public/upload', express.static(join(__dirname, 'public/upload')));
app.use(errrorHandler);


//Router
app.use(`${api}/users/auth`, authRoutes);
app.use(`${api}/categories`, authMiddleware, categoriesRoutes);
app.use(`${api}/products`, authMiddleware, productsRoutes);
app.use(`${api}/orders`, authMiddleware, ordersRoutes);
app.use(`${api}/users`, authMiddleware, adminAuth, userRoutes);


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('database connected successfully'))
    .catch((error) => console.log(error));

const server = http.createServer(app);
server.listen(3000, () => console.log(api, `App running on http://localhost:3000`));
