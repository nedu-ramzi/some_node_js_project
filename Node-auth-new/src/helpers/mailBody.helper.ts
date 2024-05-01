export class Mails {
    PasswordToken = (otp: string, name: string) => {
        const body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h3>Hello ${name}</h3>
            <p>Your Password Reset Token is: <strong>${otp}</strong></p>
            <p>We received a request to reset your password. If you didn't make this request, you can safely ignore this email.</p>
        </body>
        </html>
`;
        return body;
    }

    PasswordChanged = (name: string) => {
        const body = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            <h3>Hello ${name}</h3>
            <p>You have successfully changed your password</p>            
        </body>
        </html>
`;
        return body;
    }
}