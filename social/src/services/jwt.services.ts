import jwt from 'jsonwebtoken';
import {config} from '../config/main.config';

export const issueToken = async(payload: {}) =>{
    return jwt.sign(payload, config.services.jwt.secret, {expiresIn: config.services.jwt.expiresIn});

}

export const verifyToken = async (token: string)=>{
    return jwt.verify(token, config.services.jwt.secret);
}