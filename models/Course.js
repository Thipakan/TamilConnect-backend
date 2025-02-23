const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');

const Course = sequelize.define('Course', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    file: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: true,
});

Course.belongsTo(User, { foreignKey: 'teacherId' }); // Lien avec l'enseignant (User)

module.exports = Course;
