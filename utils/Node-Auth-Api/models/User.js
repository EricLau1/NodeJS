const bcrypt =  require('bcrypt');
module.exports = (sequelize, DataType) => {

    const User = sequelize.define('users', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                isEmail: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    },
    {
        hooks: {
            // Ante de criar um novo usuário a senha será criptografada.
            beforeCreate(user) {
                const salt = bcrypt.genSaltSync();
                user.set('password', bcrypt.hashSync(user.password, salt));
            },
        },
    });

    // função pertencente a esta classe
    User.verifyPassword = function (hash, password) {
       return bcrypt.compareSync(password, hash);
    };

    return User;
};