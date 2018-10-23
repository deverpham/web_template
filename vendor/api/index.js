const Logger = require('./logger');
const {
    Monitor
} = require('./monitor')
const RouterAPI = require('./router')
const HookAPI = require('./hooks')
const viewAPI = require('./view')
const themeAPI = require('./theme')
const ModelAPI = require('./model')
const configAPI = require('./config')
const CookieAPI = require('./cookie')

function bootApp() {

}
module.exports = {
    MonitorAPI: Monitor,
    loggerAPI: new Logger(),
    RouterAPI,
    HookAPI,
    viewAPI,
    themeAPI,
    ModelAPI,
    configAPI,
    bootApp,
    CookieAPI
}