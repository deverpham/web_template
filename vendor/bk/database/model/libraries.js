const {sequelize, Sequelize} = require('../database.config');
const Libraries  = sequelize.define('libraries', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
module.exports = Product;