import { ApplicationError } from '../helpers/error.helper.js';
import { User } from '../models/user.model.js';
import argon from 'argon2';
import { issuetoken } from './jwt.service.js';

export const register = async (payload) => {
    try {
        const { name, email, password, passwordConfirmation, profileImage } = payload;

        // check that the password is the same as the confirm password field
        if (password !== passwordConfirmation) throw new ApplicationError('Password do not match', 422);

        //check if there is a user with the same email field
        if (await User.findOne({ email: email }) === email) throw new ApplicationError('A user account with the same email already exist', 422);

        //create a new user account 
        await User.create({
            name, email, password: await argon.hash(password), profileImage
        });
        return { name, email, profileImage }
    } catch (error) {
        console.log(error);
    }

}

export const login = async function (payload) {
    const { email, password } = payload;

    //verify that the user exists

    const user = User.findOne({ email: email });
    if (!user) throw new ApplicationError('User account not found', 404);

    //verify the user password
    if (!(await argon.verify(user.password, password))) throw new ApplicationError("Invalid email or password", 401);

    //generate the token
    const authUser = {
        sub: user.id,
        name: user.name,
        email: user.email,
        image: user.profileImage
    }

    return issuetoken(authUser);
}

export const requestPasswordReset = async function (payload) { }

export const resetPassword = async function (payload) { }