class UsersController {

    constructor(modelUsers) {

        this.Users = modelUsers;

    }

    getAll() {

        return this.Users
                .findAll({
                    order: [['id', 'ASC']]
                })
                .then(data => data)
                .catch(error => error);

    }

    getById(params) {

        return this.Users
                .findOne({where: params})
                .then(data => data)
                .catch(error => error);
    }

    create(data) {

        return this.Users
                .create(data)
                .then(result => result)
                .catch(error => error);
    }

    update(data, params){

        return this.Users
                .update({
                    name: data.name,
                    email: data.email
                }, {where: params})
                .then(rowsCount => rowsCount)
                .catch(error => error);
    }

    delete(params) {

        return this.Users
                .destroy({where: params})
                .then(result => result)
                .catch(error => error);
    }
}

module.exports = UsersController;