module.exports = (sequelize, DataTypes) => {
    sequelize.define('user', {
        nick: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(40),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        }
    }, {
        timestamps: true,
        paranoid: true,
    });
}