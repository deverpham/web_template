const {
    app,
    loggerAPI
} = require('./vendor');
const config = require('./environments');
switch (config.name) {
    case 'dev': {
        overrideConsoleLog();
        app.startServer({
            config,
            callback: function () {
                console.log('server is running', config.server.port)
            }
        })
        break;
    }
    default: {
        global.cpLog = () => { }
        app.startServer({
            config,
            callback: function () {
                console.log('server is running', config.server.port)
            }
        })
    }
}

/**
 * @description Override default console
 * @description Using for debug purpose
 */
function overrideConsoleLog() {
    const copyObject = global.console
    global.console = loggerAPI
    global.cpLog = copyObject.log
}