import { Router } from 'express';
import { User } from '../model/user.js';
import bcrypt from 'bcryptjs';

export const router = Router();

router.get(`/`, async (req, res) => {
    const user = await User.find().select('-passwordHarsh');

    if (!user) {
        res.status(500).json({ success: false });
    }
    res.send(user);
});

router.get(`/:id`, async (req, res) => {
    const user = await User.findById(req.params.id).select('-passwordHarsh');

    if (!user) {
        res.status(500).json({ success: false });
    }
    res.send(user);
});


router.get(`/get/count`, async (req, res) => {
    const userCount = await User.countDocuments();

    if (!userCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        userCount: userCount
    })
});

router.put(`/:id`, async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id,
        {
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
        }, 
        { new: true });
    if (!user) {
        res.status(400).send('The User can not be updated');
    }
    res.send(user);
});

router.delete(`/:id`, (req, res) => {
    User.findByIdAndRemove(req.params.id).then((user) => {
        if (user) {
            return res.status(200).json({ success: true, message: 'the user is deleted!' })
        } else {
            return res.status(404).json({ success: false, message: 'user not found!' })
        }
    }).catch((err) => {
        return res.status(400).json({ success: false, error: err });
    })
});