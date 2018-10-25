const {
    DB,
    Sequelize
} = require('../sequelize')
const {
    helperAPI
} = require('../../../api')
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
User.prototype.checkCredentials = function (isHash = false) {
    var {
        username,
        password
    } = this.dataValues
    if (!isHash) {
        const hash = helperAPI.encrypt('base64', password)
        password = hash
    }
    return User.findOne({
        where: {
            username,
            password
        }
    })

}
module.exports = User;