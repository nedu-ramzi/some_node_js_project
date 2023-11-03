import { Router } from 'express';
import { User } from '../model/user.js';
import bcrypt from 'bcryptjs';
import { issueToken } from '../services/jwt.services.js';

export const router = Router();

router.post(`/register`, async (req, res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        passwordHarsh: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        isAdmin: req.body.isAdmin,
        street: req.body.street,
        apartment: req.body.apartment,
        zip: req.body.zip,
        city: req.body.city,
        country: req.body.country
    });
    user = await user.save();

    if (!user) {
        res.status(400).send('The User can not be created');
    }
    res.send(user);
});

router.post(`/login`, async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('The user not found');
    }
    const passCheck = await bcrypt.compare(req.body.password, user.passwordHarsh);

    const payload = {
        uid: user.id,
        isAdmin: user.isAdmin,
    };
    if (user && passCheck) {
        const token = await issueToken(payload);
        res.status(200).send({ user: user.email, token: token });
    } else {
        res.status(400).send('password is wrong');
    }
});