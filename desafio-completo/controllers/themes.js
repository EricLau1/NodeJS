class ThemesController {

    constructor(modelThemes) {

        this.Themes = modelThemes;

    }

    getAll() {

        return this.Themes
                .findAll({
                    order: [['id', 'ASC']]
                })
                .then(data => data)
                .catch(error => error);

    }

    getById(params) {

        return this.Themes
                .findOne({where: params})
                .then(data => data)
                .catch(error => error);
    }

    create(data) {

        return this.Themes
                .create(data)
                .then(result => result)
                .catch(error => error);
    }

    update(data, params){

        return this.Themes
                .update({
                    description: data.description
                }, {where: params})
                .then(rowsCount => rowsCount)
                .catch(error => error);
    }

    delete(params) {

        return this.Themes
                .destroy({where: params})
                .then(result => result)
                .catch(error => error);
    }
}

module.exports =ThemesController;