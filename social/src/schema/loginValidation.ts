import Joi from "joi";

export const loginValidation = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(7)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
});

export const errorHandler = function (payload: Request, schema: Joi.ObjectSchema) {

    const { error } = schema.validate(payload, { abortEarly: false });

    // let errors = {};
    let errors: { [key: string]: any } = {};

    if (error) {
        error.details.forEach((item) => {
            let key = item.context.key;

            let errorBag = {
                message: item.message,
            };

            errors[key] = errorBag;
        });

        return errors;
    }

    return null;
};
