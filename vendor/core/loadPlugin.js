const path = require('path');
const glob = require('glob');
const fs = require('fs');
const { loggerAPI } = require('../api')
module.exports = (function () {
    const pluginFolder = path.join(__dirname, '../../plugins/*/');
    return {
        load: function (req, res, next) {
            var plugins = glob.sync(pluginFolder)
            const listPluginWillRun = []
            const cachewillbeRemove = []
            plugins.filter(async plugin => {
                let indexFilePath = path.join(plugin, `./index.js`);
                if (!fs.existsSync(indexFilePath)) {
                    loggerAPI.warn('plugin: ' + path.basename(plugin).toUpperCase() + `: missing index.js file`)
                } else {
                    let pluginModule = require(indexFilePath);
                    if ('init' in pluginModule) {
                        let mask = pluginModule.init
                        pluginModule.init = function (req, res) {
                            return new Promise((resolve) => {
                                mask.done = resolve
                                mask.apply(mask, arguments);
                            })
                        }
                        listPluginWillRun.push(pluginModule)
                        cachewillbeRemove.push(indexFilePath);
                        cachewillbeRemove.map(link => {
                            delete require.cache[require.resolve(link)]
                        })
                    } else {
                        loggerAPI.error('plugin: ' + path.basename(plugin).toUpperCase() + `: missing init function`)
                    }
                }
            })
            Promise.all(listPluginWillRun.map(plugin => {
                return plugin.init(req, res)
            })).then(() => {
                next()
            })
        }
    }
}())