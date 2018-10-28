const path = require('path');
class ConfigAPI {
    constructor(defaultConfig = {
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
            password: "password",
            database: "supercms",
            operatorsAliases: false,
            secret_key: "Let's CBD"
        },
        view: {
            static: {
                path: path.join(__dirname, '../../static'),
                route: '/assets'
            }
        },
        plugin: {
            rootFolder: path.join(__dirname, '../../plugins')
        }
    }) {
        this.configOpts = defaultConfig
    }
    database() {
        return this.configOpts.database;
    }
    getSiteUrl() {
        return this.configOpts.server.siteUrl;
    }
    getStaticPath() {
        return this.configOpts.view.static;
    }
    getPluginFolder() {
        return this.configOpts.plugin.rootFolder
    }
}
module.exports = new ConfigAPI();