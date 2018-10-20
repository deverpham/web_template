const Sequelize = require('sequelize');
const path = require('path');
const sequelize = new Sequelize({
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    pool: {
      max: 10000,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    storage: path.join(__dirname, './database.db'),
    operatorsAliases: false
  });
  module.exports = {
    sequelize,
    Sequelize
  };