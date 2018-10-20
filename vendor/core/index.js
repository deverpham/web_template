
const { themeAPI } = require('../api')
const path = require('path');
async function bootApp() {
    loadTheme();
    loadRoutes();
}
function loadTheme() {
    themeAPI.setTheme(path.join(__dirname, '../../themes/deverpham'));
}
function loadRoutes() {
    require('./routes')
}
module.exports = { bootApp }