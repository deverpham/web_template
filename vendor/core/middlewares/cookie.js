var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const cookieParser = require('cookie-parser');

const {
    DB
} = require('../database/sequelize')
const sessionStore = new SequelizeStore({
    db: DB
})

module.exports = function () {
    const middleware = session({
        secret: 'keyboard cat',
        store: sessionStore,
        cookie: {
            maxAge: 600000000000
        },
        resave: false,
        saveUninitialized: true,
        proxy: false
    })
    return {
        cookieParser: cookieParser(),
        middleware
    }
}