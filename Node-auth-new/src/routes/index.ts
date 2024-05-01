import { Router } from 'express';
import auth from './auth';
import user from './user';

const router = Router();

export default (): Router => {
    auth(router);
    user(router);
    
    return router;
}