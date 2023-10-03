import { Router } from "express";
import {deleteUserById, updateUserById, getUserByEmail, getUserbyId, getAllUsers} from '../controllers/user.controller';

export default(router: Router)=>{
    router.get('/users',  getAllUsers);

    router.get('/users/email',  getUserByEmail);
    router.get('/users/:id',  getUserbyId);

    router.delete('/users/:id', deleteUserById);
    router.patch('/users/:id', updateUserById);
}