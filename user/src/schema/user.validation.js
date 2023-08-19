import Joi from 'joi';

export const userValidationSchema = Joi.object({
    firstname: Joi.string().min(3).max(15).required(),
    lastname: Joi.string().min(3).max(15).required(),
    email: Joi.string().email().min(5).max(50).required(),
    username: Joi.string().min(3).max(15).required(),
    password: Joi.string().min(5).max(10).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    confirmPassword: Joi.string().min(5).max(10).pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});