var Sequelize = require('sequelize');
var fs = require('fs');
var path = require('path');

var database = null;

const loadModels = function (sequelize) {

    // retorna o caminho do diretório models
    const dir = path.join(__dirname, '../models');
    const models = [];

    // readdirSync(dir) recebe um caminho de diretorio e retorna todos os arquivos dele.
    fs.readdirSync(dir).forEach(function (file) {

        // modelDir recebe o nome do arquivo junto com o caminho do diretorio em que se encontra
        const modelDir = path.join(dir, file);

        // sequelize irá mapear o model e retornar 
        const model = sequelize.import(modelDir);

        // O nome do model é definido na classe utilizando o Sequelize
        models[model.name] = model;

    });

    return models;

}

module.exports = function (app) {

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
            models: {},
        };

        database.models = loadModels(sequelize);

        sequelize.sync().then(function (){
            return database;
        });
    
    }

    return database;

};