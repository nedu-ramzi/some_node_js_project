import { asyncWrapper } from '../helpers/asyncwrapper.helper.js';
import * as authService from '../services/auth.service.js';

export const registerUser = asyncWrapper(async function (req, res, next) {
    const user = await authService.register(req.body);

    return res.status(201).json({
        "success": true,
        "message": "User registered successfully",
        "data": {
            "user": user
        },

    });
});

export const logUserIn = asyncWrapper(async function (req, res, next) {
    const token = await authService.login(req.body);

    res.status(200).json({
        "success": true,
        "message": "User logged in successfully",
        authorization: {
            type: "Bearer",
            token: token
        }
    });
});

export const authenticatedUser = asyncWrapper(async function (req, res, next) {
    return res.status(200).json({
        success: true,
        message: "Authenticated user record returned",
        data: {
            user: req.user
        }
    });
});

export const requestPasswordReset = asyncWrapper(async function (req, res, next) { });
export const resetPassword = asyncWrapper(async function (req, res, next) { });
