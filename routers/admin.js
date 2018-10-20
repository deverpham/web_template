const { RouterAPI, hookAPI } = require('../vendor')
const admin = new RouterAPI('admin');
admin.get('/', (req, res) => {
    hookAPI.do_action('ADMIN_HOME');
    res.end();
})