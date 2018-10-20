const {sequelize, Sequelize} = require('../database.config');
const Product  = sequelize.define('products', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
})
module.exports = Product;