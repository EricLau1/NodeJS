var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');

var database = null;

const loadModels = function (sequelize) {

    const dir = path.join(__dirname, '../models');

    const models = [];

    fs.readdirSync(dir).forEach((file) => {

        const modelDir = path.join(dir, file);

        const model = sequelize.import(modelDir);

        console.log(model);

        models[model.name] = model;

    });

    return models;

}

module.exports = (app) => {

    if(!database) {

        const config = app.config;

        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );

        database = {
            sequelize: sequelize,
            Sequelize: Sequelize,
            models: {}
        };

        database.models = loadModels(sequelize);

        sequelize.sync().done(() => database );

    }

    return database;

};