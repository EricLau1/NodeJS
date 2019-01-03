const ThemesController = require('../controllers/themes');
module.exports = (app) => {
	
	const themesController = new ThemesController(app.datasource.models.themes);

	app.route("/themes")
		.get((req, res) => {
			themesController
				.getAll()
				.then(data => res.json(data));
		})
		.post((req, res) => {
			themesController
			.create(req.body)
			.then(data => res.json(data))
			.catch(error => {
				console.log(error);
				res.status(422);
			});		
		});

	app.route('/themes/:id')
		.get((req, res) => {
			themesController
				.getByParams(req.params)
				.then(data => res.json(data))
				.catch(error => {
					console.log(error);
					res.status(400);
				});
		})
		.put((req, res) => {
			themesController
				.update(req.body, req.params)
				.then(data => res.json(data))
				.catch(error => {
					console.log(error);
					res.status(422);
				});	
		})
		.delete((req, res) => {
			themesController
				.delete(req.params)
				.then(data => res.sendStatus(204))
				.catch(error => {
					console.log(error);
					res.status(422);
				});
		});

};