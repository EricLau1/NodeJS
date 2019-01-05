module.exports = (sequelize, DataType) => {

    const Group = sequelize.define('groups', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        theme: {
            type: DataType.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: true
            }  
        }
    });

    return Group;
};