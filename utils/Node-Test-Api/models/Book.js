export default (sequelize, Datatype) => {
  // definindo um modelo no banco de dados
  const Book = sequelize.define('Books', {
    id: {
      type: Datatype.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Datatype.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      type: Datatype.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Book;
};
