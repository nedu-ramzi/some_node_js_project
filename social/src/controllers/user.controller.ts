import { User } from "../models/user.model";
import express from 'express';
import { asyncWrapper } from "../helpers/asyncWrapper";
import { ApplicationError } from "../helpers/errors.helper";

export const getAllUsers = asyncWrapper(async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.find();

        return res.status(200).json({
            success: true,
            message: 'All users returned successfully',
            data: {
                user
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            "success": false,
            "error": {
                "message": error.message,
                "code": error.code
            }
        });
    }
});

export const getUserbyId = asyncWrapper(async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findById(req.params);

        return res.status(201).json({
            success: true,
            message: 'User selected by Id',
            data: {
                user: user
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            "success": false,
            "error": {
                "message": error.message,
                "code": error.code
            }
        });
    }
});

export const getUserByEmail = asyncWrapper(async (req: express.Request, res: express.Response) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email: email });

        return res.status(201).json({
            suceess: true,
            message: 'User successfully selected by email',
            data: {
                user: user
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            "success": false,
            "error": {
                "message": error.message,
                "code": error.code
            }
        });
    }

});

export const updateUserById = asyncWrapper(async (req: express.Request, res: express.Response) => {
    try {
        const { firstname, lastname, birthDate, email, password, confirmPassword, profileImage } = req.body;

        if (password !== confirmPassword) {
            throw new ApplicationError('Passwords do not match', 422);
        }
        const user = await User.findByIdAndUpdate(req.params.id, { firstname, lastname, email, password, profileImage }, { new: true });
        await user.save();

        return res.status(200).json({
            "success": true,
            "message": "Information Updated Successfully",
            "data": {
                "user": user
            }
        });
    } catch (error) {
        return res.status(400).json({
            "success": false,
            "error": {
                "message": error.message,
                "code": error.code
            }
        });
    }

});

export const deleteUserById = asyncWrapper(async (req: express.Request, res: express.Response) => {
    try {
        const user = await User.findByIdAndDelete(req.params);

        return res.status(201).json({
            suceess: true,
            message: 'User successfully deleted',
            data: {
                user: user
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            "success": false,
            "error": {
                "message": error.message,
                "code": error.code
            }
        });
    }

});