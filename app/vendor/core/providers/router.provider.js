const RouterExpress = require('express').Router
const validate = require('express-validation');
const joi = require('joi')
class Router {
    constructor(handler, slash = "") {
        this._slash = slash;
        this.handler = handler;
        this._validates = {};
        this.native = new RouterExpress();
        const extendNative = Object.assign(this.native, {
            listen: this.listen.bind(this),
            joi: joi,
            initValidate: this.initValidate.bind(this),
            configValidate: this.configValidate.bind(this),
            enableGuard: this.enableGuard.bind(this),
            virtual: this.virtual.bind(this)
        });
        return extendNative
    }
    listen() {
        console.info(`listen Route: `, this._slash)
        this.handler.ctrl.use(this._slash, this.native);
    }
    initValidate() {
        const Routes = Object.keys(this._validates);
        Routes.map(route => {
            const methods = Object.keys(this._validates[route]);
            methods.map(method => {
                this.native[method.toLowerCase()](route.toLowerCase(), validate(this._validates[route][method]))
            })
        })

    }
    configValidate(validates) {
        this._validates = validates;
        this.initValidate();
    }

    enableGuard(...guards) {
        guards.map(guard => {
            this.native.use(guard.listen())
        })
    }
    virtual() {
        this.name = ' thinh'
        return {
            set: (template) => {

            },
            create: (callback, payload) => {
                const [req, res] = payload;
                console.log(callback);
                return callback;
            }
        }
    }
}
module.exports = {
    Router
};