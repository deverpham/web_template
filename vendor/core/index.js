
const { themeAPI } = require('../api')
const { app } = require('../express');
const { responseMiddleware } = require('./middlewares');
const path = require('path');
async function bootApp() {
    loadTheme();
    applyMiddleware();
    loadRoutes();
}
function loadTheme() {
    themeAPI.setTheme(path.join(__dirname, '../../themes/deverpham'));
}
function loadRoutes() {
    require('./routes')
}
function applyMiddleware() {
    app.use(responseMiddleware);
}
module.exports = { bootApp }