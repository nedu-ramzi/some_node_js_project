import jwt from 'jsonwebtoken';

export const issueToken = async (payload) => {
    try {
        return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
    } catch (error) {
        console.log('Error Generating token: ', error)
    }
    
};

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        console.log('Token not verified: ', error);
    }
    
};