import { Router } from 'express';
import { userValidationMiddleware } from '../middleware/user.middleware.js';
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../controller/registration.controller.js';

export const router = Router();

router.route('/register')
    .post(userValidationMiddleware, createUser)
    .get(getUsers)

router.route('/register/:id')
    .get(getUser)
    .put(userValidationMiddleware, updateUser)
    .delete(deleteUser);