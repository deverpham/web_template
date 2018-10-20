const Logger = require('./logger');
const { Monitor } = require('./monitor')
const RouterAPI = require('./router')
const HookAPI = require('./hooks')

module.exports = {
    MonitorAPI: Monitor,
    loggerAPI: new Logger(),
    RouterAPI,
    HookAPI
}