import { Router } from "express";
import { userId, userDetails, createUser, updateUser, deleteUser, login } from "../controller/users.controller.js";
import { createUrl } from '../controller/url.controller.js';
import { userValidationMiddleware } from "../middleware/user.middleware.js";
import { authMiddleware } from '../middleware/auth.middleware.js'
import { shortUrl } from "../model/url.model.js";
export const router = Router();


//route
router.get('/', (req, res) => {
    res.render('index', { title: "Home" });
});
router.get('/login', (req, res) => {
    res.render('login', { title: "Login" });
});
router.get('/register', (req, res, next) => {
    res.render('register', { title: "Register" });
});

router.get('/user', userDetails);

router.post('/login', login);
router.post('/register', userValidationMiddleware, createUser);

router.route('/user/shortUrl')
    .post(authMiddleware, createUrl)
    .get(authMiddleware, async (req, res, next) => {
        const shortUrls = await shortUrl.find();
        res.render('shortUrl', { title: "Short Url", shortUrls });
    });

router.route('/user/:id')
    .get(userId)
    .delete(deleteUser)
    .put(userValidationMiddleware, updateUser);



router.get('/404', (req, res) => {
    res.render('404', { title: "Application" });
});

