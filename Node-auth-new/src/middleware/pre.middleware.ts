import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import express from 'express';


export const Premiddleware = (app: express.Application) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 50000 }));
    app.use(helmet());
    app.use(compression());
    app.use(morgan('dev'));
    app.use(cors({
        credentials: true
    }));

    return app;
}
