const RouterExpress = require('express').Router
const validate = require('express-validation');
const joi = require('joi')
class Router {
    constructor(handler, slash = "") {
        this.slash = slash;
        this.handler = handler;
        this.validates = {};
        this.native = new RouterExpress();
        const extendNative = Object.assign(this.native, {
            listen: this.listen.bind(this),
            joi: joi,
            initValidate: this.initValidate.bind(this),
            configValidate: this.configValidate.bind(this),
            enableGuard: this.enableGuard.bind(this)
        });
        return extendNative
    }
    listen() {
        console.info(`listen Route: `, this.slash)
        this.handler.ctrl.use(this.slash, this.native);
    }
    initValidate() {
        const Routes = Object.keys(this.validates);
        Routes.map(route => {
            const methods = Object.keys(this.validates[route]);
            methods.map(method => {
                this.native[method.toLowerCase()](route.toLowerCase(), validate(this.validates[route][method]))
            })
        })

    }
    configValidate(validates) {
        this.validates = validates;
        this.initValidate();
    }

    enableGuard(...guards) {
        guards.map(guard => {
            this.native.use(guard.listen())
        })
    }
}
module.exports = {
    Router
};