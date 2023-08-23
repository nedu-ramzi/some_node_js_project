import { Users } from "../model/User.model.js"
import * as argon from "argon2";
import { issueToken } from '../services/jwt.service.js'
// userId, userDetails, createUser, updateUser, deleteUser, login

export const userId = async (req, res, next) => {
    try {
        const { id } = req.params;

        const User = await Users.findById(id);
        return res.status(200).json({
            "success": true,
            "message": "Successful",
            "User": User
        });
    } catch (err) {
        return res.status(404).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            },
            redirect: '/404'
        }

        );
    }

}

export const userDetails = async (req, res, next) => {
    try {
        const User = await Users.find().sort({ createdAt: -1 });
        return res.status(200).json({
            "success": true,
            "message": "Successful",
            "User": User
        });
    } catch (err) {
        return res.status(422).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            },
        });
    }
}

export const createUser = async (req, res, next) => {
    try {
        const { firstname, lastname, email, username, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            throw new Error('Password Mis-match');
        }

        const hashedPassword = await argon.hash(password);
        const User = await Users.create({ firstname, lastname, email, username, password: hashedPassword });
        await User.save();
        return res.status(200).json({
            "success": true,
            "message": "Created Successfully",
            "User": User,
        });

    } catch (err) {
        return res.status(422).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            },
        });
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;

        const User = await Users.findByIdAndUpdate(req.params.id,
            { firstname, lastname, email, username, password },
            { new: true }
        );
        return res.status(200).json({
            "success": true,
            "message": "Updated Successfully",
            "User": User
        });
    } catch (err) {
        return res.status(422).json({
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            },
        });
    }

}

export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const User = await Users.findByIdAndDelete(id);

        return res.status(200).json({
            "success": true,
            "message": "Deleted Successfully",
            "User": User
        });

    } catch (err) {
        return res.status(404).json({
            redirect: '/profile',
            "success": false,
            "error": {
                "message": err.message,
                "code": err.code
            }
        });
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const User = await Users.findOne({ email });
        if (!User) {
            throw new Error('User not found');
        }
        if (!await argon.verify(User.password, password)) {
            throw new Error('Invalid credentials, check your email or password');
        }
        const payload = {
            id: User.id,
            name: User.name,
            email: User.email
        };

        const token = issueToken(payload);

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            authorization: {
                type: 'bearer',
                token: token
            },
        });
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: err.message,
        });

    }
}