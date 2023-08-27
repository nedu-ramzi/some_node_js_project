import Joi from 'joi';

export const userValidationSchema = Joi.object({
    firstname: Joi.string().min(3).max(20).required(),
    lastname: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().min(5).max(50).required(),
    organisation: Joi.string().min(3).max(50).required(),
    country: Joi.string().min(3).max(30).required(),
});