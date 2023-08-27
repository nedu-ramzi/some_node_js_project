import { Register } from "../model/register.model.js";
import { transporter, options } from "../services/nodemailer.service.js";
import axios from 'axios';
import { SERVICE_URL, JWT_SECRET, FROM_EMAIL, FROM_NAME } from "../config/main.config.js";
import jwt from "jsonwebtoken";


export const postWithToken = async (
    url,
    data,
    options = {}
) => {
    url = SERVICE_URL + url;

    options.headers = options.headers || {};
    options.headers["Authorization"] = "Bearer " + generateToken(JWT_SECRET);
    return await axios.post(url, data, options);
};

const generateToken = (secret) => {
    return jwt.sign(
        {
            id: "7326846",
        },
        secret
    );
};


export const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, organisation, country } = req.body;

        const emailExist = await Register.findOne({ email });

        if (emailExist) {
            throw new Error("Email Already Exist");
        }

        const register = await Register.create({ firstname, lastname, email, organisation, country });
        await register.save();

        options.to = emailExist;
        try {
            let response = await postWithToken("/v1/api/email/send", {
                from: FROM_EMAIL,
                name: FROM_NAME,
                to: email,
                subject: "Account Registered!",
                message: "Hello",
            });

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }

        return res.status(201).json({
            "success": true,
            "message": "User Created Successfully",
            "data": {
                "register": register
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
        const register = await Register.findById(id);
        if (!register) {
            throw new Error('User not found');
        }
        return res.status(200).json({
            "success": true,
            "message": "Participant selected",
            "data": {
                "register": register
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
        const register = await Register.find();
        return res.status(200).json({
            "success": true,
            "message": "All Participants Selected",
            "data": {
                "register": register
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
        const { firstname, lastname, email, organisation, country } = req.body;
        const register = await Register.findByIdAndUpdate(req.params.id, { firstname, lastname, email, organisation, country }, { new: true });
        await register.save();
        return res.status(200).json({
            "success": true,
            "message": "Information Updated Successfully",
            "data": {
                "register": register
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
        const register = await Register.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            "success": true,
            "message": "User Deleted Successfully",
            "data": {
                "register": register
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
