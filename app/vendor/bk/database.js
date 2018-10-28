const path = require('path');
const Product = require('./database/model/product');
const Category = require('./database/model/category');
const PostType = require('./database/model/post_type');
const Posts = require('./database/model/posts');
const {sequelize, Sequelize} = require('./database/database.config');
const crud = require('./database/crud')
init = function() {
            return new Promise(async resolve => {
            Promise.all([Product, Category, PostType, Posts].map(table => {
                crud(table)
                table.sync({
                    force: false
                })
            }
            )).then(() => {
                resolve();
            })
    })
}
module.exports = {init}
