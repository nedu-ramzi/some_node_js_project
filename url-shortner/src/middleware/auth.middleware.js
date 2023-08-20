import { verifyToken } from '../services/jwt.service.js';

export const authMiddleware = (req, res, next) => {
    try {
        const payload = verifyToken(req);

        if (!payload) {
            throw new Error('User is not Authenticated');
        }

        req.user = {
            id: payload.id,
            name: payload.name,
            email: payload.email
        };

        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message
        });
    }
}
