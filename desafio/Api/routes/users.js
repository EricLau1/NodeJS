const UsersController = require('../controllers/users');

module.exports = (app) => {

	const usersController = new UsersController(app.datasource.models.users);

	app.route('/users')
		.all(app.auth.authenticate())
		.get((req, res) => {
			usersController
				.getAll()
				.then((response) => res.json(response.data))
				.catch((error) => res.status(error.statusCode));
		});

	app.route('/signup')	
		.post((req, res) => {
			usersController
				.create(req.body)
				.then((response) => {

					res.json(response);
					res.status(response.statusCode);

					if(response.statusCode != 422) {
						// envia o email de cadastro
						const email = req.body.email;
						app.email.write(email);
						app.email.send();				
					}

				})
				.catch((error) => res.status(error.statusCode));
		});

	app.route('/users/:id')
		.all(app.auth.authenticate())
		.get((req, res) => {
			usersController
				.getById(req.params)
				.then((response) => res.json(response.data))
				.catch((error) => res.status(error.statusCode));
		})
		.put((req, res) => {
			usersController
				.update(req.body, req.params)
				.then((response) => res.json(response))
				.catch((error) => res.status(error.statusCode));
		})
		.delete((req, res) => {
			usersController
				.delete(req.params)
				.then((response) => res.sendStatus(response.statusCode))
				.catch((error) => res.status(error.statusCode));
		});
}