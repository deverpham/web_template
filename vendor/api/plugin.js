const configAPI = require('./config')
const loggerAPI = require('./logger')
const pathAPI = require('./path');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const helperAPI = require('./helper')
class Plugin {
    /**
     * Working with a plugin 
     * @param {string} pathFolder 
     */
    constructor(pathFolder) {
        this.path = pathFolder;
    }
    getInfo() {
        const packageJson = path.join(this.path, './package.json')
        const pkgInfo = helperAPI.json().parseFromFile(packageJson);
        if (pkgInfo != null) {
            pkgInfo['pathDir'] = this.path
        }
        return pkgInfo
    }
}
class PluginAPI {
    getAll() {
        const {
            rootPath
        } = pathAPI.plugin();
        let plugins = glob.sync(rootPath + '/*/')
        plugins = plugins.map(plugin => new Plugin(plugin))
        plugins = plugins.map(plugin => plugin.getInfo())
        return plugins
    }

}
module.exports = new PluginAPI();