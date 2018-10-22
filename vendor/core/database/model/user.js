const { DB, Sequelize } = require('../sequelize')
const User = DB.define('categories', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 6
        },
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            min: 6
        }
    },
    role: {
        type: Sequelize.STRING,
        defaultValue: 'member'
    }
})
User.prototype.checkCredentials = (username, password) => {
    console.log(this, username, password);
}
module.exports = User;