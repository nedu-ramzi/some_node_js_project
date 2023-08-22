import { Router } from 'express';
import { userValidationMiddleware } from '../middleware/user.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { createUser, getUser, getUsers, updateUser, deleteUser, login } from '../controller/user.controller.js';

export const router = Router();

router.route('/user')
    .post(userValidationMiddleware, createUser)
    .get(getUsers)


router.post('/user/login', login);

router.get('/user/dashboard', authMiddleware, (req, res) => {
    res.send("<p>hello user</p>");
});

router.route('/user/:id')
    .get(getUser)
    .put(userValidationMiddleware, updateUser)
    .delete(deleteUser);