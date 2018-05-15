const express = require('express');
const cheerio = require('cheerio');
const path = require('path');
const app = express();
const core = require('./loadcore');
const plugins = require('./loadPlugin');
const routes = require('./loadRouter');
global.APP = app;
// Load Plugin
app.startServer = async function(callback) {
    await core.start();
    app.use('*', plugins.load)
    await routes.start()
    app.use('*', async(req, res) => {
        res.send('404')
    })
    app.listen(3000, () => {
        callback();
    })
}
module.exports = app;
