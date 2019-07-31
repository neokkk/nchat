const Sequelize = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_NAME, DB_TIMEZONE } = process.env;

const db = {};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, { 
    host: 'localhost', 
    dialect: 'mariadb',
    dialectOptions: { timezone: DB_TIMEZONE },
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);
db.Chat = require('./chat')(sequelize, Sequelize);

// 1 : n = room : user
db.User.belongsTo(db.Room, { foreignKey: 'id' });

// 1 : n = user : chat
db.Chat.belongsTo(db.User, { foreignKey: 'id' });

// 1 : n = room : chat
db.Chat.belongsTo(db.Room, { foreignKey: 'id' });

module.exports = db;