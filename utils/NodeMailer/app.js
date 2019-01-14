var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'seu-gmail@gmail.com', // informe o gmail principal que irá enviar emails
      pass: 'sua-senha'            // informe a senha que usa para logar no gmail
    }
  });
  
  var mailOptions = {
    from: 'eric.devtt@gmail.com',         // Quem irá enviar o email
    to: 'ericlau.oliveira@gmail.com',     // Quem irá receber o email
    subject: 'Enviando Email com NodeJS', // Assunto do Email
    // Conteúdo do Email no formato HTML
    html: `
        <center>
        <h1 style="color:red;"> Olá, tudo bem? </h1> 
        <p style="color:#606060;"> Você é a pessoa mais incrível que eu já conheci, e irá fazer coisas grandiosas!</p> 
        <img src="https://source.unsplash.com/random" width="300px" height="300px">
        <p style="color:blue;"><strong> Abraços!!! :) </strong> <p>
        </center>
    `
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email enviado: ' + info.response);
    }
  }); 