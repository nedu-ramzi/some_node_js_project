import { User } from "../model/User.model.js";
import * as argon from 'argon2';
import nodemailer from 'nodemailer';
import { config } from "../config/main.config.js";

export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            throw new Error('Password Do not match');
        }
        if (User.email) {
            throw new Error('Email Already Registered');
        }
        const hashedPassword = await argon.hash(password);
        const user = await User.create({ firstname, lastname, email, username, password: hashedPassword });
        await user.save();

        const transporter = nodemailer.createTransport({
            service: config.services.mailer.name,
            auth: {
                user: config.services.mailer.user,
                pass: config.services.mailer.pass
            }
        });

        let link = "";
        const mailOption = {
            from: config.services.mailer.user,
            to: user.email,
            subject: "Registration Successful",
            text: `Congratulations on signing up in our website please log in with the link below
                    <a href="${link}">Login</a>`,
        };
        transporter.sendMail(mailOption, (err, info));
        if (err) {
            console.log("Error:", err);
        } else {
            console.log("Email sent:", info.res);
        }

        return res.status(201).json({
            "success": true,
            "message": "User Created Successfully",
            "User": User,
        });
    } catch (err) {
        return res.status(422).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            }
        });
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return res.status(200).json({
            "success": true,
            "message": "User selected Successfully",
            "User": user,
        });
    } catch (err) {
        return res.status(422).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            }
        });
    }
}

export const getUsers = async (req, res) => {
    try {
        const user = await User.find();
        return res.status(200).json({
            "success": true,
            "message": "User selected Successfully",
            "User": user,
        });
    } catch (err) {
        return res.status(400).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            }
        });
    }
}

export const updateUser = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password, confirmPassword } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { firstname, lastname, email, username, password }, { new: true });

        return res.status(200).json({
            "success": true,
            "message": "Information Updated Successfully",
            "User": user,
        });
    } catch (err) {
        return res.status(400).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            }
        });
    }
}

export const deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            "success": true,
            "message": "User Deleted Successfully",
            "User": user,
        });
    } catch (err) {
        return res.status(422).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            }
        });
    }
}