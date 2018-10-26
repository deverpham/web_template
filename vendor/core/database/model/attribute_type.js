
const {
    DB,
    Sequelize
} = require('../sequelize')
const {
    helperAPI
} = require('../../../api')
const AttributeTypeModel = DB.define('attribute_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    }
})
module.exports = AttributeTypeModel;