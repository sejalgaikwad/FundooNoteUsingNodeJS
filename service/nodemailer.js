const nodemailer = require('nodemailer');
// create mail transpoter

exports.sendEmailFunction = (url) => {   
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