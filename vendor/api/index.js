const Logger = require('./logger');
const {
    Monitor
} = require('./monitor')
const {
    RouterAPI,
    RouterChild
} = require('./router')
const HookAPI = require('./hooks')
const viewAPI = require('./view')
const themeAPI = require('./theme')
const ModelAPI = require('./model')
const configAPI = require('./config')
const CookieAPI = require('./cookie')
const pathAPI = require('./path')
const GuardAPI = require('./guard')
const helperAPI = require('./helper')

function bootApp() {

}
module.exports = {
    MonitorAPI: Monitor,
    loggerAPI: new Logger(),
    RouterAPI,
    RouterChild,
    HookAPI,
    viewAPI,
    themeAPI,
    ModelAPI,
    configAPI,
    CookieAPI,
    pathAPI,
    GuardAPI,
    bootApp,
    helperAPI
}