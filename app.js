const { app } = require('./vendor');
app.startServer({
    port: 80,
    callback: async function () {
        loggerAPI.debug('server running', 80)
    }
});