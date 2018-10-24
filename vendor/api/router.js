const {
    Router
} = require('express')
const {
    app
} = require('../express')
const validate = require('express-validation');
const joi = require('joi')
class RouterAPI {
    constructor(slash) {
        this.slash = slash;
        this.router = new Router()
        this.validates = {}
        this.router['joi'] = joi
        this.router['listen'] = this.listen.bind(this)
        this.router['initValidate'] = this.initValidate.bind(this)
        this.router['configValidate'] = this.configValidate.bind(this)
        this.router['enableGuard'] = this.enableGuard.bind(this)
        return this.router
    }
    listen() {
        console.log(`listen Route`, this.slash)
        app.use('/' + this.slash, this.router)
        this.initValidate();
    }
    initValidate() {
        const Routes = Object.keys(this.validates);
        Routes.map(route => {
            const methods = Object.keys(this.validates[route]);
            methods.map(method => {
                this.router[method.toLowerCase()](route.toLowerCase(), validate(this.validates[route][method]))
            })
        })

    }
    configValidate(validates) {
        this.validates = validates;
    }
    enableGuard(...guards) {
        guards.map(guard => {
            this.router.use(guard.listen())
        })
    }
}
module.exports = RouterAPI;