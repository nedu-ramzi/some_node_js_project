import { config } from '../config/config.main';
import { ApplicationError } from '../helpers/errors.helpers';
import { Request, Response, NextFunction } from 'express';


export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApplicationError) {
        return res.status(err.statusCode).json({
            success: false,
            errors: {
                message: err.message,
                code: err.statusCode,
                stack: (config.server.mode === 'development') ? err.stack : {}
            }
        })
    }

    return res.status(500).json({
        success: false,
        errors: {
            message: err.message,
            stack: config.server.mode === "development" ? err.stack : {},
        },
    });
}