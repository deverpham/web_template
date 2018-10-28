const {
    app,
    loggerAPI
} = require('./vendor');
overrideConsoleLog()
app.startServer({
    port: 8080,
    callback: async function () {
        console.debug('server running', 8080)
    }
});

function overrideConsoleLog() {
    const copyObject = global.console
    global.console = loggerAPI
    global.cpLog = copyObject.log
}