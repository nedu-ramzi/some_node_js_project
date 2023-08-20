import { Router } from 'express';
import {userValidationMiddleware} from '../middleware/user.middleware.js';
import { createUser, getUser, getUsers, updateUser, deleteUser } from '../controller/user.controller.js';

export const router = Router();

router.post('/user', userValidationMiddleware, createUser);
router.get('/user:id', getUser);
router.get('/user', getUsers);
router.put('/user', userValidationMiddleware, updateUser);
router.delete('/user:id', deleteUser);