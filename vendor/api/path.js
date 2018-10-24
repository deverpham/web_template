const {
    app,
} = require('../express')
const path = require('path');
const configAPI = require('./config')
class PathAPI {
    static() {
        const staticPath = configAPI.getStaticPath();
        return (function () {
            return {
                path: staticPath.path,
                getFileUrl: function (pathFile) {
                    return configAPI.getSiteUrl() + path.join(staticPath.route, pathFile);
                }
            }
        }())
    }
}
module.exports = new PathAPI();