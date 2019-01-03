const bcrypt = require('bcrypt');
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
			unique: true,
			validate: {
				isEmail: true,
				notEmpty: true
			}
		},
		password: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		phone: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		office: {
			type: DataType.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		}
	},
	{
		hooks: {
			beforeCreate(user) {
				const salt = bcrypt.genSaltSync();
				user.set('password', bcrypt.hashSync(user.password, salt));
			},
		},
	});

	User.verify = function (hash, password) {
		return bcrypt.compareSync(password, hash);
	}

	return User;
}