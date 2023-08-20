import jwt from 'jsonwebtoken';
import { config } from "../config/main.config.js";

export const issueToken = (payload) => {
    return jwt.sign(payload, config.services.jwt.secret, { expiresIn: config.services.jwt.expires });
}

export const verifyToken = (req) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader || typeof authHeader === 'undefined') {
        return false;
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return false;
    }

    return jwt.verify(token, config.services.jwt.secret);
}