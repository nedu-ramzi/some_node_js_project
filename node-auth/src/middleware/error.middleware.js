import { config } from '../config/main.config.js';
import { ApplicationError } from "../helpers/error.helper.js";

export const errorHandler = (err, req, res, next) => {
    if (err instanceof ApplicationError) {
        return err.status(err.statusCode).json({
            "success": false,
            "errors": {
                "message": err.message,
                "code": err.statusCode,
                "stack": (config.server.mode === 'development') ? err.stack : {}
            }
        });
    }
    return res.status(500).json({
        "success": false,
        "errors": {
            "message": err.message,
            "code": err.code,
            "stack": (config.server.mode === 'development') ? err.stack : {}
        }
    })
}