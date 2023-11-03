import { verifyToken } from "../services/jwt.services.js";

export const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];
    if (!token) {
        return res.status(400).send('Invalid User credential');
    }
    const payload = await verifyToken(token);

    req.user = payload;
    // res.locals.admin = payload;
    next();
}

export const adminAuth = async (req, res, next) => {
    
    if (req.user.isAdmin) {
        return next();
    }

    return res.status(403).send('You are not an admin!');
}