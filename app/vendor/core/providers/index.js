const Logger = require('./logger.provider');
const helper = require('./helper.provider');
const Hook = require('./hook.provider')
const {
    WebHandler
} = require('./handler.provider');
/*
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
const templateAPI = require('./template');
*/
module.exports = {
    Logger,
    WebHandler,
    helper,
    Hook,
    /*
    RouterAPI,
    RouterChild,
    templateAPI,
    HookAPI,
    viewAPI,
    themeAPI,
    ModelAPI,
    configAPI,
    CookieAPI,
    pathAPI,
    GuardAPI,
    pluginAPI,
    helperAPI
    */
}