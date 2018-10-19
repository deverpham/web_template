const Logger = require('./logger');
const { Monitor } = require('./monitor')
const RouterAPI = require('./router')
/**
 * Load All API
 */
function load() {
    global.loggerAPI = new Logger();
    global.MonitorAPI = Monitor
    global.RouterAPI = RouterAPI
}
module.exports = { load }