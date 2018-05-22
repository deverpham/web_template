const {sequelize, Sequelize} = require('../database.config');
const Product  = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    }
})
module.exports = Product;