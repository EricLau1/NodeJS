class ThemesController {

	constructor(themes) {
		this.Themes = themes;
	}

	getAll() {
		return this.Themes
				.findAll({ order: [['id', 'ASC']] })
				.then(result => result)
				.catch(error => error);
	}

	getByParams(params) {
		return this.Themes
				.findOne({where: params})
				.then(result => result)
				.catch(error => error);
	}

	create(data) {
		return this.Themes
				.create(data)
				.then(result => result)
				.catch(error => error);
	}

	update(data, params) {
		return this.Themes
				.update({
					description: data.description
				}, {where: params})
				.then(result => result)
				.catch(error => error);
	}
	
	delete(params) {
		return this.Themes
				.destroy({where: params})
				.then(result => result)
				.catch(error => error);
	}
}

module.exports = ThemesController;