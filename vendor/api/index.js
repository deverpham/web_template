const Logger = require('./logger');
const { Monitor } = require('./monitor')
const RouterAPI = require('./router')
const HookAPI = require('./hooks')
const viewAPI = require('./view')
const themeAPI = require('./theme')
function bootApp() {

}
module.exports = {
    MonitorAPI: Monitor,
    loggerAPI: new Logger(),
    RouterAPI,
    HookAPI,
    viewAPI,
    themeAPI,
    bootApp
}