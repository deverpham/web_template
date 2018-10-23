const responseMiddleware = require('./response')
const hookAPI = require('./hookapi')
const bodyParserMiddleware = require('./bodyparser')
const CookieMiddleware = require('./cookie');
module.exports = {
    responseMiddleware,
    hookAPI,
    bodyParserMiddleware,
    cookieMiddleware: CookieMiddleware()
}