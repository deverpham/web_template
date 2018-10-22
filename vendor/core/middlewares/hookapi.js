const { HookAPI } = require('../../api')
module.exports = async function (req, res, next) {
    const hookAPI = new HookAPI();
    res.locals.hookAPI = hookAPI;
    next();
}