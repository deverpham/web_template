const {
    Router,
    Model
} = require('../providers')
const {
    theme,
    view
} = require('../controllers')
const route = new Router(HANDLER); /*eslint-disable-line no-undef */

route.render = async function (req, res) {
    view.style().add(res, {
        type: 'link',
        content: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
    })
    view.script().add(res, {
        type: 'link',
        content: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'
    })
    view.script().add(res, {
        type: 'link',
        content: "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
    })
    if ('header' in this)
        await this.header(req, res);
    await res.renderStream('admin/template/header.ejs');
    await this.content(req, res);
    await res.renderStream('admin/template/footer.ejs')
    res.end();
}.bind(route)

route.reset = function () {
    this.header = () => {};
    this.content = () => {};
}

route.get('/virtual', function () {
    this.reset()
    this.header = function (req, res) {
        res.write('gooddfdf')
    }
    this.content = function (req, res) {
        res.write('hello')
    }
    return this.render
}.bind(route)())

route.get('/login', function () {
    this.reset();
    this.content = async function (req, res) {
        await res.renderStream('admin/login.ejs')
    }
    return this.render
    const hook = res.locals.hook;
    res.setHeader('Content-type', 'text/html')
    hook.add_filter('ADMIN_PAGE_TITLE', {
        callback: () => 'LOGIN'
    })
    hook.add_action('ADMIN_LOGIN_FORM', {
        callback: async function (oldData) {
            oldData = oldData || '\n';
            const User = new Model('user');
            /* Render Login Form */
            const loginFormTemplate = theme.admin().templateDir() + '/login/loginform.ejs';
            const hook = res.locals.hook;
            const result = await User.getFormTemplate(['username', 'password'], loginFormTemplate, hook)
            return oldData + result;
            /* Render Login Form */
        }
    })
    res.end();
}.bind(route)())
route.listen()