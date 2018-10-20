const { HookAPI } = require('../../api')
module.exports = function (req, res, next) {
    res.locals.hookAPI = new HookAPI()
    next();
}