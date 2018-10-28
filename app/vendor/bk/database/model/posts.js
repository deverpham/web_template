const {sequelize, Sequelize} = require('../database.config');
const Posts  = sequelize.define('posts', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    post_types : {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    picture: {
        type: Sequelize.STRING,
        allowNull: true
    }
})
module.exports = Posts;