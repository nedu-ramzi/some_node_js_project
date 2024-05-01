import { verifyToken } from "../utils/jwt.utils";
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(400).send('Invalid User Credential');
    }
    const payload = await verifyToken(token);

    res.locals.isAdmin = payload;

    next();
}

export const adminAuth = async (req: Request, res: Response, next: NextFunction) => {
    if (res.locals.isAdmin) {
        return next();
    }
    return res.status(403).send('You are not an admin!');
}