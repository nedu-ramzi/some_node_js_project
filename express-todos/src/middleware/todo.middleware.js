// import dependencies
import errorHandler from "../config/errorHandler.config.js";
import todoValidationSchema from "../schema/todo.schema.js";

// define handler
const todoValidationMiddleware = function (req, res, next) {
    const errors = errorHandler(req.body, todoValidationSchema);

    if (typeof errors === 'object' && errors !== null && !Array.isArray(errors)) {
        return res.status(422).json({
            success: false,
            error: errors
        })
    }
    next();
}

// export handler
export default todoValidationMiddleware;