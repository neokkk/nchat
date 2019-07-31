module.exports = (sequelize, DataTypes) => (
    sequelize.define('chat', {
        chat: {
            type: DataTypes.STRING(),
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE(),
            allowNull: false,
            defaultValue: sequelize.literal('now()'),
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
)