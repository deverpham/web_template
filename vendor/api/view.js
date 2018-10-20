const { app } = require('../express')
class ViewAPI {
    constructor() {
        app.engine('html', require('ejs').renderFile);
        app.set('view engine', 'html');
    }
    addEngine(name, func) {
        return app.engine(name, func)
    }
    setEngine(name) {
        return app.set('view engine', name)
    }
}
module.exports = new ViewAPI()