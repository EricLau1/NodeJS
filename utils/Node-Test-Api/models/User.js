import bcrypt from 'bcrypt';

export default (sequelize, DataType) => {
  const User = sequelize.define('Users', {
    id: {
      type: DataType.INTEGER,
      primaryKey: true,
      autoIcrement: true,
    },
    name: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: DataType.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { // Estas açõe serão executadas antes de realizar uma
    // determinada operação na tabela.
    hooks: {
      // A senha será encriptada antes de realizar o insert
      beforeCreate(user) {
        const salt = bcrypt.genSaltSync();
        user.set('password', bcrypt.hashSync(user.password, salt));
      },
    },
  });

  // método pertecente a esté model
  User.isPassword = (encodedPassword, password) => {
    bcrypt.compareSync(password, encodedPassword);
  };

  return User;
};
