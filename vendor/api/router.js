const { Router } = require('express')
const { app } = require('../express')
class RouterAPI {
    constructor(slash) {
        this.slash = slash;
        this.router = new Router()
        this.init();
        return this.router
    }
    init() {
        app.use('/' + this.slash, this.router)
    }
}
module.exports = RouterAPI;