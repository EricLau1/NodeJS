const HttpStatus = require('http-status');
const jwt = require('jsonwebtoken');
//const jwt = require('jwt-simple');

module.exports = function (app) {

	const config = app.config;

	const Users = app.datasource.models.users;

	app.route('/token')
		.post((req, res) => {

			console.log();

			if(req.body.email && req.body.password) {

				const email = req.body.email;
				const password = req.body.password;

				Users
					.findOne({where: { email } })
					.then(user => {

						//console.log(user);

						if( Users.verify(user.password, password) ) {

							const payload = { id: user.id };

							res.json({
								//token: jwt.encode(payload, config.jwtSecret)
								token: jwt.sign({ data: payload }, config.jwtSecret, { expiresIn: '1h' })
							});

						} else {

							res.sendStatus(HttpStatus.UNAUTHORIZED);

						}
					})
					.catch((error) => res.sendStatus(HttpStatus.UNAUTHORIZED));

			} else {
				res.sendStatus(HttpStatus.UNAUTHORIZED);
			}

		});
}