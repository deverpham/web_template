const {
    RouterAPI,
    ModelAPI
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
    res.setHeader('Content-type', 'text/html')
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            return 'Login'
        }
    })
    hookAPI.add_filter('ADMIN_LOGIN_FORM', {
        callback: async function () {
            const User = new ModelAPI('UserModel');
            return User.getForm('input', ['username', 'password', 'role'])
        }
    })
    await res.renderStream('admin/login.ejs')
    res.end();
})

route.post('/login', (req, res) => {

})