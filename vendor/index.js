const {
    app
} = require('./express')
const API = require('./api/index');
const core = require('./core')
/**
 * Run App
 * @param {object} option
 */
app.startServer = async function (option) {
    await core.bootApp();

    //await routes.start();
    app.use('*', async (req, res) => {
        res.send('404')
    })
    app.listen(option.port, () => {
        if ('callback' in option) option.callback();
    })
}
module.exports = {
    app,
    ...API
};