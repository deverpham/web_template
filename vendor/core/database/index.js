const UserModel = require('./model/user')
const { DB } = require('./sequelize')
function loadDatabase() {
    return DB.sync()
}
module.exports = {
    UserModel,
    loadDatabase
}