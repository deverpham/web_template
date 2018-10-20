const Logger = require('./logger');
const { Monitor } = require('./monitor')
const RouterAPI = require('./router')
const hookAPI = require('./hooks')
const viewAPI = require('./view')

function load() {
}
module.exports = {
    MonitorAPI: Monitor,
    loggerAPI: new Logger(),
    RouterAPI,
    hookAPI,
    viewAPI,
    load
}