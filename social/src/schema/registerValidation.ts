import Joi from "joi";

export const registerValidation = Joi.object({
    firstname: Joi.string().min(3).max(35).required(),
    lastname: Joi.string().min(3).max(35).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(30)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    confirmPassword: Joi.string().min(6).max(30)
        .pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')).required(),
    birthDate: Joi.date()
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
