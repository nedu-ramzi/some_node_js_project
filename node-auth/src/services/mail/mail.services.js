import nodemailer from 'nodemailer';
import config from '../../config/main.config.js';

const mailer = nodemailer.createTransport(config.services.mail);

//configure the template handler

//send the mail here
export const sendMail = function (payload, template) {
    return mailer.sendMail({
        to: payload.to,
        from: 'Wonderful App <swift@wonderapp.com>',
        template: template,
        context: payload.context
    });
}