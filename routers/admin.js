const { RouterAPI, HookAPI } = require('../vendor')
const admin = new RouterAPI('admin');
admin.get('/', (req, res) => {
    HookAPI.add_action('SERVER_START', {
        id: 'block',
        callback: function () {
            console.log('tot')
        }
    })
    HookAPI.add_action('new', {
        id: 'block',
        callback: function () {

        }
    })
    res.success('completed')
})