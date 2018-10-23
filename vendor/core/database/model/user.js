const {
    DB,
    Sequelize
} = require('../sequelize')
const User = DB.define('user', {
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
User.prototype.checkCredentials = function () {
    const {
        username,
        password
    } = this.dataValues
    return User.findOne({
        where: {
            username,
            password
        }
    })

}
module.exports = User;