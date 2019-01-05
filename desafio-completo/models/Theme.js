module.exports = (sequelize, DataType) => {

    const Theme = sequelize.define('themes', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataType.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        }
    });

    return Theme;

} 