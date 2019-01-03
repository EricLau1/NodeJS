const HttpStatus = require('http-status');

const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
	data,
	statusCode
});

const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => ({
	message,
	statusCode
});

class UsersController {

	// construtor irá receber o model do sequelize
	constructor(users) {
		this.Users = users;
	}

	getAll() {
		return this.Users
			.findAll({ order: [['id', 'ASC']] })
			.then((results) => defaultResponse(results))
			.catch((error) => errorResponse(error.message));
	}

	getById(params) {
		return this.Users
			.findOne({where : params})
			.then((result) => defaultResponse(result))
			.catch((error) => errorResponse(error));
	}

	create(data) {
		return this.Users
			.create(data)
			.then((response) => defaultResponse(response, HttpStatus.CREATED))
			.catch((error) => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
	}

	update(data, params) {
		return this.Users
			.update(
				{ 
					name: data.name, 
					email: data.email, 
					phone: data.phone, 
					office: data.office
				},
				{where: params}
			)
			.then((response) => defaultResponse(response))
			.catch((error) => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
	}

	delete(params) {
		return this.Users
			.destroy({where: params})
			.then((response) => defaultResponse(response, HttpStatus.NO_CONTENT))
			.catch((error) => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
	}
}

module.exports = UsersController;
