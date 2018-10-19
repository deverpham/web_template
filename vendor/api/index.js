const Logger = require('./logger');
const { Monitor } = require('./monitor')
/**
 * Load All API
 */
function load() {
    global.loggerAPI = new Logger();
    global.MonitorAPI = Monitor
}
module.exports = { load }