
const { themeAPI } = require('../api')
const { app } = require('../express');
const { responseMiddleware, hookAPI } = require('./middlewares');
const plugins = require('./loadPlugin')
const path = require('path');
async function bootApp() {
    loadTheme();
    applyMiddleware();
    loadPlugin();
    loadRoutes();
}
function loadTheme() {
    themeAPI.setTheme(path.join(__dirname, '../../themes/deverpham'));
}
function loadRoutes() {
    require('./routes')
}
function loadPlugin() {
    app.use(plugins.load)
}
function applyMiddleware() {
    app.use(hookAPI, responseMiddleware);
}
module.exports = { bootApp }