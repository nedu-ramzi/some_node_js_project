import express from 'express';
import { asyncWrapper } from "../helpers/asyncWrapper";
import * as authServices from '../services/auth.services';

export const registerUser = asyncWrapper(async (req: express.Request, res: express.Response) =>{
   
    const user = await authServices.register(req.body);

    return res.status(200).json({
        success: true,
        message: 'User registered successfully',
        data: {
            user:user
        }
    })
});

export const loginUser = asyncWrapper(async(req:express.Request, res: express.Response) =>{
    const token = await authServices.login(req.body);

    return res.status(200).json({
        success: true,
        message: `User is logged successfully`,
        authorization : {
            type : 'Bearer',
            token: token
        }
    });
});


