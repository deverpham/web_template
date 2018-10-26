const {
    UserModel,
    PostTypeModel
} = require('./model')
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
    PostTypeModel,
    loadDatabase,
}