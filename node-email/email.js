const nodemailer = require('nodemailer');

class Email {

    constructor(config) {

        const host = config.host;
        const port = config.port;
        const user = config.auth.user;
        const pass = config.auth.pass;

        this.options = {};

        this.transporter = nodemailer.createTransport({
            host: host,
            port: port,
            auth: {
              user: user,
              pass: pass
            }
        });

    }

    writeTo(destiny) {

        this.options = {
            from: 'eric.devtt@gmail.com',
            to: destiny,
            subject: 'Nodejs Emails',
            text: 'Você recebeu um email de uma aplicação nodejs!'
          };

    }

    send() {
  
        this.transporter.sendMail(this.options, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });

    }

}

module.exports = Email;