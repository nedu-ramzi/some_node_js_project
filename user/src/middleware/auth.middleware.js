import { verifyToken } from "../services/jwt.service.js";

export const authMiddleware = (req, res, next) => {
    try {
        const payload = verifyToken(req);
        if (!payload) {
            throw new Error('Not Authenticated');
        }
        req.user = {
            id: payload.id,
            username: payload.username,
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