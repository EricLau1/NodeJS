const nodemailer = require('nodemailer');

module.exports = function (app) {

	var config = app.config.email;
	var master = config.user;
	var defaultUser = config.default;

	var transporter = nodemailer.createTransport({
		service: config.service,
		auth: {
			user: master,
			pass: config.pass
		} 
	});

	var options = null;

	var write = function (user) {
		options = {
			from: master,
			to: user,
			subject: "Confirmação de cadastro",
			html: `
				<center>
				<h4>Api Rest com NodeJs<h4>
				<p style='color: green;'>seu cadastro foi realizado com sucesso!</p>
				<p>Obrigado por se increver em nosso site :)</p>
				<p> Atenciosamente ${ master }</p>
				</center>
			`
		};
	};

	var send = function() {

		if(options != null) {

			transporter.sendMail(options, (error, info) => {
				if(erro) {
					console.error(error);
				} else {
					console.log("1 email foi enviado com sucesso!");
					console.log(info.response);
				}
			});

		}  else {
			console.log("Não conseguiu enviar email");
		}
	}
	
	return {
		write: write,
		send: send,
	};
};
