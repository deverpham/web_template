const {sequelize, Sequelize} = require('../database.config');
const Category = sequelize.define('post_types', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        unique: true
    },
    url: {
        type: Sequelize.STRING,
        unique: true
    },
    fields: {
        type: Sequelize.JSON,
        allowNull: true
    },
})
module.exports = Category;