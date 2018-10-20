const Logger = require('./logger');
const { Monitor } = require('./monitor')
const RouterAPI = require('./router')
const hookAPI = require('./hooks')
const viewAPI = require('./view')
const themeAPI = require('./theme')
function bootApp() {

}
module.exports = {
    MonitorAPI: Monitor,
    loggerAPI: new Logger(),
    RouterAPI,
    hookAPI,
    viewAPI,
    themeAPI,
    bootApp
}