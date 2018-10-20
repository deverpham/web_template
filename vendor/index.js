
const { app } = require('./express')
const plugins = require('./loadPlugin');
const routes = require('./loadRouter')
const API = require('./api/index');
const core = require('./core')
/**
     * Run App
     * @param {object} option
 */
app.startServer = async function (option) {
    API.load();
    await core.load();
    app.use(plugins.load)
    //await routes.start();
    app.use('*', async (req, res) => {
        res.send('404')
    })
    setInterval(() => {
        API.hookAPI.do_action('NOTIFY')
    }, 3000)
    app.listen(option.port, () => {
        if ('callback' in option) option.callback();
    })
}
module.exports = {
    app,
    ...API
};
