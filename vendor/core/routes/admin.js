const { hookAPI, RouterAPI } = require('../../api')
const route = new RouterAPI('admin');
route.get('/', (req, res) => {
    hookAPI.do_action('RENDER')
    res.renderStream('<h1>Hello world</h1>');
    res.end();
})