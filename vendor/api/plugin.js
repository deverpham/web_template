const configAPI = require('./config')
const loggerAPI = require('./logger')
const pathAPI = require('./path');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
class Plugin {
    /**
     * Working with a plugin 
     * @param {string} pathFolder 
     */
    constructor(pathFolder) {
        this.path = pathFolder;
    }
    getInfo() {
        const packageJson = path.join(this.path, './package.json');
        packageJson
        //fs.readFileSync(packageJson)
        if (!fs.existsSync(packageJson)) return null;
        return JSON.parse(fs.readFileSync(packageJson))
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