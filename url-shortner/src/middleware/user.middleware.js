// import dependencies
import { errorHandler } from "../config/errorHandler.config.js";
import { userValidationSchema } from "../schema/user.schema.js";

// define handler
export const userValidationMiddleware = function (req, res, next) {
    const errors = errorHandler(req.body, userValidationSchema);

    if (typeof errors === 'object' && errors !== null && !Array.isArray(errors)) {
        return res.status(422).json({
            success: false,
            error: errors
        })
    }
    next();
}