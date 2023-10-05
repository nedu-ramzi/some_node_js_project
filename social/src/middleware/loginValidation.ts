import { Request, Response, NextFunction } from "express";
import { loginValidation, errorHandler } from "../schema/loginValidation";

export const loginValidationMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const errors = errorHandler(req.body, loginValidation);

    if (typeof errors === 'object' && errors !== null && !Array.isArray(errors)) {
        return res.status(422).json({
            success: false,
            error: errors
        })
    }
    next();
}