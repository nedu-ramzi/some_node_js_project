import express, { Request, Response } from 'express';
import { Premiddleware } from './middleware/pre.middleware';
import { errorHandler } from './middleware/errors.middleware';
import router from './routes/index';

const app = express();
//pre middleware
Premiddleware(app);

//default response
app.get('/', (req: Request, res: Response) => {
    try {
        res.send("Welcome ");
    } catch (e) {
        res.status(500).send(`${e}:<br /> Internal Server Error`);
        console.log(`${e}: Internal Server Error`);
    }
});

// setup error handlers
app.use(errorHandler);

//import all routes
app.use('/api/v1', router());

//Handles 404
app.use((req: Request, res: Response) => {
    res.status(404).send('Sorry, the page you are looking for does not exist');
})

export default app;