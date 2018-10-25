const {
    Monitor
} = require('./monitor')
const loggerAPI = require('./logger');
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
const pluginAPI = require('./plugin')
const helperAPI = require('./helper')

function bootApp() {

}
module.exports = {
    MonitorAPI: Monitor,
    loggerAPI,
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
    pluginAPI,
    helperAPI,
    bootApp
}