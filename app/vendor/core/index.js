const {
    themeAPI,
    viewAPI,
    configAPI
} = require('../api')
const {
    app
} = require('../express');
const {
    responseMiddleware,
    hookAPI,
    bodyParserMiddleware,
    viewHelperMiddleware,
    cookieMiddleware
} = require('./middlewares');
const plugins = require('./loadPlugin')
const path = require('path');
const {
    loadDatabase
} = require('./database')

/**
 * Boot The APP
 */
async function bootApp() {
    loadDatabase();
    loadTheme();
    applyMiddleware();
    loadPlugin();
    LoadStaticFolder();
    loadRoutes();
    errorHanding()
}

/**
 * Set Default Theme
 */
function loadTheme() {
    themeAPI.setTheme(path.join(__dirname, '../../themes/deverpham'));
}
/**
 * make the static public patg
 */
function LoadStaticFolder() {
    const staticPath = configAPI.getStaticPath();
    viewAPI.setStatic(staticPath.route, staticPath.path)
}

/**
 * Load all router in folder ./routes
 */
function loadRoutes() {
    require('./routes')
}

/**
 * Hadding Error
 */
function errorHanding() {
    app.use(function (err, req, res, next) {
        res.error(err);
    });
}

/**
 * add plugins to the app
 */
function loadPlugin() {
    app.use(plugins.load)
}

/**
 * load built-in middleware
 */
function applyMiddleware() {
    app.use(

        hookAPI,
        responseMiddleware,
        bodyParserMiddleware.json,
        bodyParserMiddleware.urlencoded,
        cookieMiddleware.cookieParser,
        cookieMiddleware.middleware,
        viewHelperMiddleware);
}

module.exports = {
    bootApp
}