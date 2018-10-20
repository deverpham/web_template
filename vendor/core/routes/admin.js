const { RouterAPI } = require('../../api')
const route = new RouterAPI('admin');
route.get('/', (req, res) => {
    res.send('ok')
})