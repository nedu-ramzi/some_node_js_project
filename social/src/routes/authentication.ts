import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { regValidationMiddleware } from "../middleware/registerValidatiom.middleware";

export default (router: Router) => {
    router.post('/auth/register', regValidationMiddleware, registerUser);
    router.post('/auth/login', loginUser);
}