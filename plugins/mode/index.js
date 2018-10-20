const { loggerAPI, HookAPI } = require('../../vendor')
module.exports = (function () {
    return {
        init: function () {
            loggerAPI.warn('Having user request. set maintain mode')
            HookAPI.add_action('SERVER_START', {
                id: 'baotriserver',
                callback: function () {
                    console.log('ok good Boy')
                }
            })
            //console.log(2)
            this.done();
        }
    }
}())