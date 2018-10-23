const path = require('path');
class ConfigAPI {
    constructor(defaultConfig = {
        server: {
            port: 8080
        },
        database: {
            host: 'localhost',
            dialect: 'sqlite',
            logging: false,
            pool: {
                max: 10000,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
            storage: path.join(__dirname, './database.db'),
            operatorsAliases: false
        }
    }) {
        this.configOpts = defaultConfig
    }
    database() {
        return this.configOpts.database;
    }
}
module.exports = new ConfigAPI();