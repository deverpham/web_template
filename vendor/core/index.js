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
    cookieMiddleware
} = require('./middlewares');
const plugins = require('./loadPlugin')
const path = require('path');
const {
    loadDatabase
} = require('./database')
async function bootApp() {
    loadDatabase();
    loadTheme();
    applyMiddleware();
    loadPlugin();
    app.use(async function (req, res, next) {
        await res.locals.hookAPI.do_action('ON_STARTING_REQUEST');
        next();
    })
    LoadStaticFolder();
    loadRoutes();
}

function loadTheme() {
    themeAPI.setTheme(path.join(__dirname, '../../themes/deverpham'));
}

function LoadStaticFolder() {
    const staticPath = configAPI.getStaticPath();
    viewAPI.setStatic(staticPath.route, staticPath.path)
}

function loadRoutes() {
    require('./routes')
}

function loadPlugin() {
    app.use(plugins.load)
}

function applyMiddleware() {
    app.use(

        hookAPI,
        responseMiddleware,
        bodyParserMiddleware.json,
        bodyParserMiddleware.urlencoded,
        cookieMiddleware.cookieParser,
        cookieMiddleware.middleware);
}
module.exports = {
    bootApp
}