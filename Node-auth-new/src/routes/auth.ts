import { Router } from 'express';
import { Authentication } from '../services/auth.services';

const auth = new Authentication();

export default (router: Router) => {
    //Register User
    router.post('/auth/register', auth.register);
    //login
    router.post('/auth/login', auth.login);
    //password Request
    router.post('/auth/passwordRequest', auth.passwordRequest);
    //password Reset
    router.post('/auth/passwordReset/:id', auth.passwordReset)
}
