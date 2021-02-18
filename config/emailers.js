var nodemailer = require('nodemailer');

let mailerConfig = {
    host: "smtpout.secureserver.net",
    secure: true,
    port: 465,
    auth: {
        user: "",
        pass: ""
    }
};
let transporter = nodemailer.createTransport(mailerConfig);

module.exports = transporter;
