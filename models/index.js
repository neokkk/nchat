const Sequelize = require('sequelize');

const { DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = {};

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, { host: 'localhost', dialect: 'mariadb' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Room = require('./room')(sequelize, Sequelize);
db.Chat = require('./chat')(sequelize, Sequelize);

// 1 : n = room : user
db.Room.hasMany(db.User);
db.User.belongsTo(db.Room);

// 1 : n = user : chat
db.User.hasMany(db.Chat);
db.Chat.belongsTo(db.User);

// 1 : n = room : chat
db.Room.hasMany(db.Chat);
db.Chat.belongsTo(db.Room);

module.exports = db;