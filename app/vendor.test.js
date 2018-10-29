const config = require('./environments');
const {
    App
} = require('./vendor/server');
const app = new App(config);
const [provider] = [app.provider()];
const logger = new provider.Logger();
switch (config.name) {
    case 'dev':
        {
            overrideConsoleLog();
            app.boot();
            break;
        }
    default:
        {
            app.boot();
        }
}

/**
 * @description Override default console
 * @description Using for debug purpose
 */
function overrideConsoleLog() {
    global.cpLog = console.log;
    global.console = logger;
}
module.exports = {
    app
}