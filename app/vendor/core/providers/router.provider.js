const RouterExpress = require('express').Router
const validate = require('express-validation');
const joi = require('joi')
class Route {
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
            virtual: this.virtual.bind(this),
            render: this.render.bind(this)
        });
        return extendNative
    }
    render(req, res) {
        res.end()
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
class Render {
    constructor() {
        this.lifeCycle = async function (req, res, next) {

            await this.Before(req, res, next);
            await this.Header(req, res, next);
            await this.Content(req, res, next);
            await this.Footer(req, res, next);
            await this.After(req, res, next);
            res.end();
        }
        this.hooks = {
            before: [],
            after: []
        }
        this.Before = async (req, res, next) => {
            await Promise.all(this.hooks.before.map(f => f(req, res, next)))
        };
        this.After = async (req, res, next) => {
            await Promise.all(this.hooks.after.map(f => f(req, res, next)))
        }
        this.Header = () => {};
        this.Footer = () => {};
    }
    apply(receiver, n, args) {
        this.Content = receiver
        return this.lifeCycle(...args);
    }
    set(receiver) {
        return new Proxy(receiver, this);
    }
    before(before) {
        this.hooks.before.push(before)
        return this;
    }
    after(after) {
        this.hooks.after.push(after)
        return this;
    }
    clone() {
        const newRender = new Render();
        newRender.Header = this.Header;
        newRender.Footer = this.Footer;
        newRender.hooks = {
            before: [],
            after: []
        }
        return newRender;
    }
}
module.exports = {
    Route,
    Render
};