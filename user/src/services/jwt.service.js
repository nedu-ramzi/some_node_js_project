import jwt from 'jsonwebtoken';
import { config } from '../config/main.config.js';

export const issueToken = (payload) => {
    return jwt.sign(payload, config.services.jwt.secret, { expiresIn: '2h' });
}

export const verifyToken = (req) => {
    const header = req.headers['authorization'];
    if (!header || typeof header === 'undefined') {
        return false;
    }

    const token = header.split(' ')[1];
    if (!token) {
        return false;
    }

    return jwt.verify(token, config.services.jwt.secret);
}