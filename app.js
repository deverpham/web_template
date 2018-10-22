const {
    app,
    loggerAPI
} = require('./vendor');
app.startServer({
    port: 8080,
    callback: async function () {
        loggerAPI.debug('server running', 8080)
    }
});