const HttpStatus = require('http-status');

// retornando um objeto de resposta padrão
const defaultResponse = (data, statusCode = HttpStatus.OK) => ({
    data,  // assume o valor passado como parâmetro.
    statusCode, // caso nenhum valor seja passado como parametro recebe o status OK por default.
});

// retornando um objeto de resposta de erro padrão
const errorResponse = (message, statusCode = HttpStatus.BAD_REQUEST) => ({
    message,
    statusCode
});

class UsersController {
    
    constructor(users) {

        this.Users = users;

    }

    getAll() {
        return this.Users
            .findAll({})
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message));
    }

    getById(params) {
        return this.Users
            .findOne({where: params})
            .then(result => defaultResponse(result))
            .catch(erro => errorResponse(error.message));
    }

    create(data) {
        return this.Users
            .create(data)
            .then(result => defaultResponse(result, HttpStatus.CREATED))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    update(data, params) {
        return this.Users
            .update(data, { where: params })
            .then(result => defaultResponse(result))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

    delete(params) {
        return this.Users
            .destroy({where: params})
            .then(result => defaultResponse(result, HttpStatus.NO_CONTENT))
            .catch(error => errorResponse(error.message, HttpStatus.UNPROCESSABLE_ENTITY));
    }

}

// recebe como parámetro um model do sequelize
module.exports = UsersController;