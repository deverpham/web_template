const {
    Router
} = require('../providers')
const route = new Router(HANDLER, '/'); /*eslint-disable-line no-undef */
route.get('/', function (req, res) {
    res.end();
})
route.listen()