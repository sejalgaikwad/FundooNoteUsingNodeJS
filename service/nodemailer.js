/******************************************************************************
 *  @description    : Nodemailer is a module for Node.js to send emails
 *  @file           : nodemailer.js
 *  @since          : 04-06-2020
 ******************************************************************************/

const nodemailer = require('nodemailer');
exports.sendEmailFunction = (url) => {
    // create mail transpoter   
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    // mail options
    const mailOptions = {
        from: 'FUNDOO MAILER',
        to: process.env.EMAIL,
        subject: 'FUNDOO-APP',
        text: url
    };

    // send mail
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            throw new Error(err);
        }else {
            console.log('Email sent: ' + info.response);
        }
    })
}