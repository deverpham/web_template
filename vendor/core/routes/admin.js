const {
    RouterAPI,
    ModelAPI,
    themeAPI,
    viewAPI
} = require('../../api')
const route = new RouterAPI('admin');
/**
 * set middlewares
 */
route.use(async function (req, res, next) {
    const hookAPI = res.locals.hookAPI;
    await hookAPI.do_action('ADMIN_ON_FINISHING_REQUEST')
    next();
})
route.get('/', async (req, res) => {
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            return 'Dashboard'
        }
    })
    await res.renderStream('admin/template/header.ejs')
    await res.renderStream('admin/home.ejs')
    await res.renderStream('admin/template/footer.ejs')
    res.end()
})

route.get('/login', async function (req, res) {
    res.setHeader('Content-type', 'text')
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            console.log('first')
            return 'Login'
        }
    })
    hookAPI.add_action('RESPONSE_HEAD', {
        callback: function () {
            res.write('bester');
        }
    })
    hookAPI.add_action('ADMIN_LOGIN_FORM', {
        callback: async function (oldData) {
            oldData = oldData || '\n';
            console.log('later');
            const User = new ModelAPI('UserModel');
            /* Render Login Form */
            const loginFormTemplate = themeAPI.getAdminTemplatePath('login/loginform.ejs');
            const hookAPI = res.locals.hookAPI;
            const result = await User.getFormTemplate(['username', 'password', 'role'], loginFormTemplate, hookAPI)
            return oldData + result;
            //return result;
            /* Render Login Form */
        }
    })
    hookAPI.add_action('ADMIN_LOGIN_FORM', {
        callback: async function (oldData) {
            console.log('later');
            const User = new ModelAPI('UserModel');
            /* Render Login Form */
            const loginFormTemplate = themeAPI.getAdminTemplatePath('login/loginform.ejs');
            const hookAPI = res.locals.hookAPI;
            const result = await User.getFormTemplate(['username', 'password', 'role'], loginFormTemplate, hookAPI)
            return oldData + result;
            //return result;
            /* Render Login Form */
        }
    })
    /*
    await res.renderStream('admin/template/header.ejs')
    await hookAPI.do_action('ADMIN_LOGIN_FORM')
    await res.renderStream('admin/template/footer.ejs')
    */
    await res.renderStream('admin/login.ejs')
    res.end();
})
route.get('/test', async function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_action('TEST', {
        callback: async function () {
            const User = new ModelAPI('UserModel');
            const loginFormTemplate = themeAPI.getAdminTemplatePath('login/loginform.ejs');
            const hookAPI = res.locals.hookAPI;
            const loginForm = await User.getFormTemplate(['username', 'password', 'role'], loginFormTemplate, hookAPI);
            return loginForm;
        }
    })
    await hookAPI.do_action('TEST');
    res.end();
})