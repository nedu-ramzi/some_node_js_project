import { Router } from 'express';
import { uploadMiddleware } from '../middleware/upload.middleware';
import { UserController } from '../controller/user.controller';

const userController = new UserController();

export default (router: Router) => {
    //upload profile picture
    router.put('/user/profile-picture/:id', uploadMiddleware("Profile Pictures"), userController.profilePicture);
}