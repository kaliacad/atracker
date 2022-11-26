import { createTransport } from "nodemailer";

export default createTransport({
    host: process.env.SERVICE_MAIL_HOST,
    service: process.env.SERVICE_MAIL,
    port: process.env.SERVICE_MAIL_PORT, // true for 465, false for other ports
    auth: {
        user: process.env.SERVICE_MAIL_USER, // generated ethereal user
        pass: process.env.SERVICE_MAIL_PASSWORD, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false,
    },
});
