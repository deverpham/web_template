const {
    RouterAPI,
    ModelAPI,
    themeAPI,
    CookieAPI
} = require('../../api')
const route = new RouterAPI('admin');
const adminController = require('../controllers/admin.controller');
/**
 * set middlewares
 */
route.use(adminController.autoAssets)
route.configValidate({
    "/login": {
        "POST": {
            body: {
                "username": route.joi.string().min(4).required(),
                "password": route.joi.string().min(6).required()
            }
        }
    }
})
route.listen()

route.get('/', async (req, res) => {
    const cookieAPI = new CookieAPI(req);
    const user = cookieAPI.get('user');
    if (!user) return res.redirect('/admin/login')
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            return 'Dashboard | ' + user.username
        }
    })
    await res.renderStream('admin/template/header.ejs')
    await res.renderStream('admin/home.ejs')
    await res.renderStream('admin/template/footer.ejs')
    res.end()
})

route.get('/login', async function (req, res) {

    const hookAPI = res.locals.hookAPI;
    res.setHeader('Content-type', 'text/html')
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            return 'Login'
        }
    })
    hookAPI.add_action('ADMIN_LOGIN_FORM', {
        callback: async function (oldData) {
            oldData = oldData || '\n';
            const User = new ModelAPI('UserModel');
            /* Render Login Form */
            const loginFormTemplate = themeAPI.getAdminTemplatePath('login/loginform.ejs');
            const hookAPI = res.locals.hookAPI;
            const result = await User.getFormTemplate(['username', 'password'], loginFormTemplate, hookAPI)
            return oldData + result;
            /* Render Login Form */
        }
    })
    await res.renderStream('admin/login.ejs')
    res.end();
})

route.post('/login', async function (req, res) {
    const cookieAPI = new CookieAPI(req);
    cookieAPI.set('submitTime', cookieAPI.get('submitTime') + 1 || 1)
    const submitTime = cookieAPI.get('submitTime');
    if (submitTime >= 6) {
        return res.error(new Error('Please Wait 6 seconds to continue'))
    }
    //res.setHeader('Content-Type', 'application/json');
    const User = new ModelAPI('UserModel');
    const user = new User.Model(req.body);
    user
        .checkCredentials()
        .then(user => {
            if (user) {
                cookieAPI.set('user', user)
                res.redirect('/admin')
                return;
                res.success(user.dataValues)
            } else {
                res.setHeader('Content-Type', 'application/json');
                res.error(new Error('Not Found User'))
            }
        })
        .catch(err => {
            res.send(err)
        })

})