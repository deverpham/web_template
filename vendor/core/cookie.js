var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var database = require('./database.js').database;
var sessionStore = new SequelizeStore({
    db: database
})
module.exports = (function()  {
    return {
        init: () => {
            
        APP.use(session({
            secret: 'keyboard cat',
            store: sessionStore,
            resave: false,
            saveUninitialized: false,
            proxy: false
        }))
        
        sessionStore.sync();
        }
    }
}())