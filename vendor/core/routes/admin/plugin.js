const {
    RouterChild
} = require('../../../api')
const loginRoute = new RouterChild()
loginRoute.listen();
module.exports = loginRoute