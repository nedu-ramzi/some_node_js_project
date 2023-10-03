import { ApplicationError } from "../helpers/errors.helper";
import { User } from "../models/user.model";
import argon from 'argon2';
import { issueToken } from "services/jwt.services";

export const register = async (payload: any)=>{
    const {firstname, lastname, email, password, confirmPassword, birthDate, profileImage} = payload;

    if (password !== confirmPassword) {
        throw new ApplicationError('Passwords not the same', 422);
    }

    const existingEmail = await User.findOne({email});
    if(existingEmail){
        throw new ApplicationError('A user account with this mail already exist', 422);
    }

    const hashPassword = await argon.hash(password);

    return await User.create({
        firstname,
        lastname,
        email,
        password: hashPassword,
        birthDate,
        profileImage
    });
}

export const login = async (payload: any)=>{
    const {email, password} = payload;

    const user = await User.findOne({email: email});
    if(!user) throw new ApplicationError('User account not found', 404);

    const verifyPassword = argon.verify(user.password, password);
    if (!verifyPassword) throw new ApplicationError('Invalid email or password', 401);

    //generate token
    const authUser = {
        sub: user.id,
        lastname: user.lastname,
        firstname: user.firstname,
        email: user.email,
        image: user.profileImage
    };

    return issueToken(authUser);
}