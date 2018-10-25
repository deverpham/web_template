const responseMiddleware = require('./response')
const hookAPI = require('./hookapi')
const bodyParserMiddleware = require('./bodyparser')
const CookieMiddleware = require('./cookie');
const viewHelperMiddleware = require('./viewhelper');
module.exports = {
    responseMiddleware,
    hookAPI,
    viewHelperMiddleware,
    bodyParserMiddleware,
    cookieMiddleware: CookieMiddleware()
}