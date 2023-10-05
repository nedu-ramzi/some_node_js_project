import { Request, Response, NextFunction } from "express";
import { registerValidation, errorHandler } from "../schema/registerValidation";

export const regValidationMiddleware = function (req: Request, res: Response, next: NextFunction) {
    const errors = errorHandler(req.body, registerValidation);

    if (typeof errors === 'object' && errors !== null && !Array.isArray(errors)) {
        return res.status(422).json({
            success: false,
            error: errors
        })
    }
    next();
}