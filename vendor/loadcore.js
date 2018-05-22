const path = require('path');
const glob = require('glob');
const fs = require('fs');
module.exports = (function() {
    ModulePath = path.join(__dirname, './core/*.js');
    return {
        start : () => {
            console.log('starting loading module')
            return new Promise(resolve => { 
                var routes = glob.sync(ModulePath)
                Promise.all(routes.map(async route => {
                    return new Promise(async resolve => {
                        let module= require(route);
                        if('init' in module ) {
                            await module.init()
                            resolve();
                            console.warn('\x1b[36m%s\x1b[0m','core: ' + path.basename(route).toUpperCase() + `: loaded`)
                        } else {
                            resolve()
                        }
                    })
                })).then(() => {
                    resolve();
                })
            })
        }
    }
}())