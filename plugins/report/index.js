const { hookAPI } = require('../../vendor')
module.exports = (function () {
    return {
        init: function (req, res) {
            hookAPI.add_action('ADMIN_HOME', {
                id: 'notify_when_user_when_maintain',
                callback: function () {
                    res.write('hello_world')
                }
            })
            hookAPI.add_action('ADMIN_HOME', {
                id: 'gg',
                callback: function () {
                    res.write('hello_world')
                }
            })
            hookAPI.add_action('ADMIN_HOME', {
                id: 'ss',
                callback: function () {
                    res.write('hello_world')
                }
            })
            hookAPI.add_action('ADMIN_HOME', {
                id: 'ff',
                callback: function () {
                    res.write('hello_world')
                }
            })
            hookAPI.add_action('ADMIN_HOME', {
                id: 'hgh',
                callback: function () {
                    res.write('hello_world')
                }
            })
            this.done();
        }
    }
}())