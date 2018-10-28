const Sequelize = require('sequelize');
const {
    store
} = require('../api')
const config = store.config().get();
const DB = new Sequelize(config.database);
module.exports = {
    DB,
    Sequelize
};