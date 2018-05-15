const path = require('path');
const glob = require('glob');
const fs = require('fs');
module.exports = (function(req, res, next) {

    pluginFolder = path.join(__dirname, './plugins/*/');
    return {
        load : function(req, res, next) {

            var plugins = glob.sync(pluginFolder)
            let listPluginWillRun = []
            let cachewillbeRemove = []
            var pluginsValid = plugins.filter(async plugin => {
                let indexFilePath = path.join(plugin,`./${path.basename(plugin)}.js`);
                if(!fs.existsSync(indexFilePath)) {
                    console.warn('\x1b[33m%s\x1b[0m','plugin: ' + path.basename(plugin).toUpperCase() + `: missing index.js file`)
                } else {
                    let pluginModule = require(indexFilePath);
                    if('init' in pluginModule) {
                        let masks = pluginModule.init
                        pluginModule.init = function(req,res) {
                            return new Promise((resolve) => {
                                masks.done = function() {
                                    resolve()
                                }
                                masks.apply(masks, arguments);
                            })
                        }
                        listPluginWillRun.push(pluginModule)
                        cachewillbeRemove.push(indexFilePath);
                        cachewillbeRemove.map(link => {
                            delete require.cache[require.resolve(link)]
                        })
                        //console.warn('\x1b[36m%s\x1b[0m','plugin: ' + path.basename(plugin).toUpperCase() + `: loaded`)
                    } else {
                        logger.error('plugin: ' + path.basename(plugin).toUpperCase() + `: missing start function`)
                    }
                }
            })
            Promise.all(listPluginWillRun.map(plugin => {
                return plugin.init(req, res)
            })).then(() => {
                next();
            })
        }
    }
}())