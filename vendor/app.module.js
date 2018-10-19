const express = require('express');
const app = express();
const core = require('./loadcore');
const plugins = require('./loadPlugin');
const routes = require('./loadRouter');
const API = require('./api/index');
global.APP = app;
// Load Plugin
/**
 * Run App
 * @param {object} option
 */
app.startServer = async function (option) {
    API.load();
    await core.start();
    app.use('*', plugins.load)
    //await routes.start()
    app.use('*', async (req, res) => {
        res.send('404')
    })
    app.listen(option.port, () => {
        if ('callback' in option) option.callback();
    })
}
module.exports = app;
