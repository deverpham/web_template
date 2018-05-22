const path = require('path');
const Product = require('./database/model/product');
const Category = require('./database/model/category');
const {sequelize, Sequelize} = require('./database/database.config');
init = function() {
            return new Promise(async resolve => {
            Promise.all([Product, Category].map(table => table.sync({
                force: true
            }))).then(() => {
                resolve();
            })
    })
}
module.exports = {init}
