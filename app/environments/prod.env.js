const path = require('path');
module.exports = {
    name: 'prod',
    server: {
        port: 8080,
        siteUrl: "http://localhost:8080"
    },
    database: {
        host: 'localhost',
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 10000,
            min: 0,
            acquire: 30000,
            idle: 1
        },
        username: "root",
        password: "root",
        database: "supercms",
        operatorsAliases: false,
        secret_key: "Let's CBD"
    },
    view: {
        static: {
            path: path.join(__dirname, '../static'),
            route: '/assets'
        }
    },
    plugin: {
        rootFolder: path.join(__dirname, '../plugins')
    }
}