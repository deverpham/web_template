const responseMiddleware = require('./response')
const hook = require('./hookapi')
const bodyParserMiddleware = require('./bodyparser')
const CookieMiddleware = require('./cookie');
const viewHelperMiddleware = require('./viewhelper');
module.exports = {
    responseMiddleware,
    hook,
    viewHelperMiddleware,
    bodyParserMiddleware,
    cookieMiddleware: CookieMiddleware()
}