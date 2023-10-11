import { Router } from 'express';
import { uploadProfileImage } from '../middleware/upload.middleware.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
import { registerUser, logUserIn, authenticatedUser } from '../controllers/auth.controller.js';

const router = new Router();

router.post('/auth/register', uploadProfileImage, registerUser);

router.post('/auth/login', logUserIn);

router.get('/auth/user', authMiddleware, authenticatedUser);

export const appRouter = router; 