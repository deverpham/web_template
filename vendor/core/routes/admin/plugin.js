const {
    RouterChild
} = require('../../../api')
const loginRoute = new RouterChild()
loginRoute.get('/', async function (req, res) {
    res.end()
})
loginRoute.listen();
module.exports = loginRoute