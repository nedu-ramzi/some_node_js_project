import { expressjwt } from 'express-jwt';

export function authJwt() {
    const secret = process.env.JWT_SECRET;
    const api = process.env.API_URL;

    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked,
    }).unless({
        path: [
            { url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS'] },
            { url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS'] },
            `${api}/users/login`,
            `${api}/users/register`,

        ]
    })
}

async function isRevoked(req, token) {
    if (!token.payload.isAdmin) {
        return true;
    }
}
