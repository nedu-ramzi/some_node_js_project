import { User } from "../model/User.model.js";
import * as argon from 'argon2';
import { issueToken } from "../services/jwt.service.js";


test('This create user function is supposed to get the req of firstname, lastname, email, username, password, confirmPassword, confirm the password against initial provided and successfully save the information to the database', () => { });

export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            throw new Error('Password Do not match');
        }
        const emailExist = await User.findOne({ email });

        if (emailExist) {
            throw new Error("Email Already Exist");
        }

        const hashedPassword = await argon.hash(password);
        const user = await User.create({ firstname, lastname, email, username, password: hashedPassword });
        await user.save();
        return res.status(201).json({
            "success": true,
            "message": "User Created Successfully",
            "data": {
                "user": user
            }
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
            "data": {
                "user": user
            }
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
            "data": {
                "user": user
            }
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
        const { firstname, lastname, email, username, password } = req.body;
        const user = await User.findByIdAndUpdate(req.params.id, { firstname, lastname, email, username, password }, { new: true });
        await user.save();
        return res.status(200).json({
            "success": true,
            "message": "Information Updated Successfully",
            "data": {
                "user": user
            }
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
            "data": {
                "user": user
            }
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("Email not registered");
        }
        const verify_password = await argon.verify(user.password, password);
        if (!verify_password) {
            throw new Error("Invalid credentials... Check your email or password");
        }

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        const token = issueToken(payload);

        return res.status(200).json({
            "success": true,
            "message": "User logged in",
            "authorization": {
                "type": "bearer",
                "token": token
            }
        });
    } catch (err) {
        return res.status(401).json({
            "success": false,
            "message": err.message
        });
    }


}