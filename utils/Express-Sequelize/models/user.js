module.exports = function (Sequelize, DataTypes) {

    // esquematizando a tabela,
    // o primeiro parametro é o nome da table
    // o segundo parametro é um json, 
    // onde a chave será o nome do atributo e 
    // o valor será o tipo do atributo.

    var user = Sequelize.define('user', {
        'name' : DataTypes.STRING
    });

    return user
}