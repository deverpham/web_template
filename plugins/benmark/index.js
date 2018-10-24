const {
    MonitorAPI,
    loggerAPI
} = require('../../vendor')
const os = require('os');

module.exports = (function () {
    return {
        init: async function (req, res) {
            if (os.platform().indexOf('win') && false) {
                this.done();
                return;
            } else {
                const hookAPI = res.locals.hookAPI;
                const pfCheck = new MonitorAPI(true);
                await pfCheck.start();
                hookAPI.add_action('ON_STARTING_REQUEST', {
                    callback: async function () {
                        await hookAPI.add_action('BENMARK_REQUEST', {
                            callback: async function () {
                                const info = await pfCheck.analytic()
                                loggerAPI.debug(
                                    `Path: ${req.path}
                        Run time: ${JSON.stringify(info)}`)
                            }
                        })
                    }
                })
                hookAPI.add_action('ADMIN_ON_FINISHING_REQUEST', {
                    callback: async function () {
                        await hookAPI.do_action('BENMARK_REQUEST')
                    }
                })
                this.done();
            }
        }
    }
}())