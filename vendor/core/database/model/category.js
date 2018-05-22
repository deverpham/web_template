const {sequelize, Sequelize} = require('../database.config');
const Category = sequelize.define('Category', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
})
module.exports = Category;