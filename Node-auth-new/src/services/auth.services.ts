import { User } from '../models/user.model';
import { PasswordReset } from '../models/password-reset.model';
import { ApplicationError } from "../helpers/errors.helpers";
import { otpGen } from '../helpers/otp.helpers';
import * as argon from 'argon2';
import { issueToken } from "../utils/jwt.utils";
import { Request, Response } from 'express';
import { transporter } from '../utils/nodemailer.utils';
import { Mails } from '../helpers/mailBody.helper';
const mails = new Mails();
import { config as dotenv } from 'dotenv';
dotenv();


export class Authentication {

    async register(req: Request, res: Response) {
        try {
            //destructure request from req.body
            const { username, email, password, confirmPassword, isAdmin } = req.body;

            //password confirmation
            if (password !== confirmPassword) {
                // throw new ApplicationError('Password do not match', 422);
                return res.status(422).json({
                    success: false,
                    message: "Password do not match",
                });
            }
            //check if mail exist
            const existEmail = await User.findOne({ email: email })
            if (existEmail) {
                // throw new ApplicationError('Email already exist', 422)
                return res.status(422).json({
                    success: false,
                    message: "Email already exist",
                });
            }

            // import bcrypt and use like so instead of argon2
            // const salt = await bcrypt.genSalt(10);
            // const hashedPassword = bcrypt.hash(password, salt)

            //hashed password to save to db
            const hashedPassword = await argon.hash(password);

            //create info and save to db
            const user = await User.create({
                username,
                email,
                password: hashedPassword,
                isAdmin
            });
            return res.status(200).json({
                success: true,
                message: 'User successfully registered',
                data: { user }
            });

        } catch (error) {
            return res.status(400).json({
                success: false,
                message: 'User not registered',
                err: {
                    err: error.message,
                }
            })
        }
    }

    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email });
            if (!user) {
                // throw new ApplicationError('User acount not found', 404)
                return res.status(404).json({
                    success: false,
                    message: "User account not found",
                })
            }

            const verifyPassword = await argon.verify(user.password, password);
            if (!verifyPassword) throw new ApplicationError('Invalid Email or password', 401)

            // for bcrypt
            // const comparePassword = await bcrypt.compare(password, user.password)

            //generate token 
            const payload = {
                id: user.id,
                email: user.email,
                password: user.password,
                admin: user.isAdmin
            }
            const token = await issueToken(payload);

            return res.status(200).json({
                success: true,
                message: 'User Logged in',
                authorization: {
                    type: 'Bearer',
                    token: token
                }
            });

        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Login failed',
                err: {
                    err: error.message
                }
            })
        }
    }

    async passwordRequest(req: Request, res: Response) {
        try {
            //Extract email from request body
            const {email} = req.body;
            //Find user by email
            const user = await User.findOne({ email });
            //Return error if user is not found
            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "User not found with provided email",
                })
            }
            //Generate otp token
            const otp = otpGen();
            //create PasswordReset doc with user and otp
            const resetToken = await PasswordReset.create({ user, resetToken: otp });

            //send mail with otp
            const mail = await transporter.sendMail({
                from: process.env.MAILER_USER,
                to: email,
                subject: "Password Reset OTP",
                html: mails.PasswordToken(otp, user.username),
            });
            //Return Success Response
            return res.status(200).json({
                success: true,
                message: "OTP Token sent to " + email,
                mail: mail.messageId
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                msg: error.message
            })
        }
    }

    async passwordReset(req: Request, res: Response) {
        try {
            const {userId} = req.params;
            const { otp, newPassword } = req.body;

            //check otp and user id validity
            const otpCheck = await PasswordReset.findOne({ resetToken: otp, user: userId });
            if (!otpCheck) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid OTP Token or User ID"
                });
            }
            //Update the user's password
            const hashedPassword = await argon.hash(newPassword);
            const user = await User.findByIdAndUpdate(userId, { password: hashedPassword }, { new: true });
            // Send successful password change to user email
            const mail = await transporter.sendMail({
                from: process.env.MAILER_USER,
                to: user.email,
                subject: "Password Changed Successfully!",
                html: mails.PasswordChanged(user.username),
            });
            //Return success response
            return res.status(200).json({
                success: true,
                message: "Password Changed Succesfully",
                data: { user, email: mail.messageId }
            });
        } catch (error) {
            console.log(error);
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
            })
        }

    }
}