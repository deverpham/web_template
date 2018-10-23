const UserModel = require('./model/user')
const {
    DB
} = require('./sequelize')

function loadDatabase() {
    return DB.sync({
        force: false
    })
}
module.exports = {
    UserModel,
    loadDatabase
}