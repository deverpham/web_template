const Sequelize = require('sequelize');
const configAPI = require('../../api/config');
const config = configAPI.database()
const DB = new Sequelize(config);
module.exports = {
    DB,
    Sequelize
};