const {
    app
} = require('./express')
const API = require('./api/index');
const core = require('./core')
app.startServer =
    /**
     * 
     * @param {Options} option 
     */
    async function (option) {
        API.configAPI.load(option.config);
        await core.bootApp();
        /**
         * @Todo: Refactor
         * @description Handing Error
         */
        app.use('*', async (req, res) => {
            res.error(new Error('not found'))
        })
        app.listen(option.config.server.port, () => {
            if ('callback' in option) option.callback();
        })
    }
module.exports = {
    /**
     * @type {App}
     */
    app,
    ...API
};