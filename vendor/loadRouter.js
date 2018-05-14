const path = require('path');
const glob = require('glob');
const fs = require('fs');
module.exports = (function() {
    routerFolder = path.join(__dirname, '../routers/*.js');
    return {
        start : function(req, res, next) {
            var routes = glob.sync(routerFolder)
            routes.map(route => {
                require(route);
                console.warn('\x1b[36m%s\x1b[0m','router: ' + path.basename(route).toUpperCase() + `: loaded`)
            })
        }
    }
}())