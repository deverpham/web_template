const {
    DB,
    Sequelize
} = require('../sequelize')
const {
    helperAPI
} = require('../../../api')

const PostType = DB.define('post_type', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug: {
        type: Sequelize.STRING,
        allowNull: false
    }
})
module.exports = PostType