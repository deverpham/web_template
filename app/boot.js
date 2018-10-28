const config = require('./environments');
const {
    app
} = require('./vendor');

return;
/*
const {
    configAPI
} = require('./vendor');
return
const {
    app
} = require('./vendor');

if (config.name == 'dev') {
    overrideConsoleLog();
}
app.startServer({
    config,
    callback: function () {
        console.log('server start');
    }
});

/* helper function */
function overrideConsoleLog() {
    const loggerAPI = require('./vendor/api/logger')
    const copyObject = global.console
    global.console = loggerAPI
    global.cpLog = copyObject.log
}