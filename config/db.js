const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tamilconnect', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

module.exports = sequelize;
