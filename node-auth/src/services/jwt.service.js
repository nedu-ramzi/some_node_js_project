import jwt from 'jsonwebtoken';
import { config } from '../config/main.config.js';


export const issuetoken = async function (payload) {
    return jwt.sign(payload, config.services.jwt.secret, { expiresIn: config.services.jwt.expiresIn });
}

export const verifyToken = async function (token) {
    return jwt.verify(token, config.services.jwt.secret)
}