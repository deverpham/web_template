const {sequelize, Sequelize} = require('../database.config');
const Category = sequelize.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
module.exports = Category;