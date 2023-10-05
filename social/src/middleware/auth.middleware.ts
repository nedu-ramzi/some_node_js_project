import express from 'express';
import { verifyToken } from "../services/jwt.services";
import { ApplicationError } from '../helpers/errors.helper';

export const authMiddleware = async (req:express.Request, res:express.Response, next:express.NextFunction)=>{
    const authHeader = req.headers['authorization'];
    console.log(authHeader);
    
    const token: string = authHeader.split(' ')[1];

    if(!token) throw new ApplicationError('Invalid User Credentials', 401);

    res.locals.user = verifyToken(token);
    req.body.usr = 'Harry';

    next();
}