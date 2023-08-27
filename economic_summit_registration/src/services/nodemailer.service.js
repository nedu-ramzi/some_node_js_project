import nodemailer from "nodemailer";
import { Register } from "../model/register.model.js";
import { config } from "../config/main.config.js";

export const transporter = nodemailer.createTransport({
    service: config.services.mailer.host,
    auth: {
        user: config.services.mailer.user,
        pass: config.services.mailer.pass,
    }
});
console.log(transporter);

export const options = {
    from: config.services.mailer.user,
    to: '',
    subject: "Enugu Economic Summit Registration Successful",
    text: `Dear ${Register.lastname} ${Register.firstname}, 
    Pleased to inform you that your registeration to Enugu Economic Summit was successfully captured.
    You are expected to be sitted at the venue at exactly 8:00am on 'Date'.`
}