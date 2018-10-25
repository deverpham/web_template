const {
    RouterAPI,
    ModelAPI,
    themeAPI,
    CookieAPI,
    viewAPI,
    pathAPI,
    GuardAPI,
    helperAPI
} = require('../../api')
const route = new RouterAPI('admin');
const adminController = require('../controllers/admin.controller');
const {
    homeRoute,
    pluginRoute
} = require('./admin/')
/**
 * set middlewares
 */
route.use(adminController.autoAssets)
route.use(function (req, res, next) {
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('MODEL_BEFORE_SAVE_DATA', {
        callback: function (old, locals) {
            const modelAPI = locals.modelAPI;
            const {
                name
            } = modelAPI.Model;
            switch (name) {
                case 'user':
                    hash = helperAPI.encrypt('base64', old.password)
                    return {
                        ...old,
                        password: hash
                    };
                default:
                    return old
            }
        }
    })
    next()
})
route.configValidate({
    "/login": {
        "POST": {
            body: {
                "username": route.joi.string().min(4).required(),
                "password": route.joi.string().min(6).required()
            }
        }
    },
    "/user": {
        "POST": {
            body: {
                "username": route.joi.string().min(4).required(),
                "password": route.joi.string().min(6).required()
            }
        },
        "DELETE": {
            query: {
                id: route.joi.number().required()
            }
        }
    }
})
const AuthGuard = new GuardAPI({
    name: 'AuthGuard',
    callbackUrl: '/admin/login',
    exceptRoute: ['/login', '/register'],
    canActivate: async function (req, res) {
        const cookieAPI = new CookieAPI(req)
        const userStored = cookieAPI.get('user');
        if (!userStored) return false;
        const User = new ModelAPI('user');
        const user = new User.Model(userStored);
        const isExist = await user.checkCredentials(true);
        return isExist;
    }
});
route.enableGuard(AuthGuard)
route.listen()
/**
 * Config Router
 */
route.use('/', homeRoute)
route.use('/plugin', pluginRoute)
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
            const User = new ModelAPI('user');
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
    if (submitTime >= 6 && false) {
        return res.error(new Error('Please Wait 6 seconds to continue'))
    }
    //res.setHeader('Content-Type', 'application/json');
    const User = new ModelAPI('user');
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

route.get('/register', async function (req, res) {
    res.success('nothing')
})
route.get('/:model/', async function (req, res) {
    res.setHeader('Content-Type', 'text/html')
    const modelAPI = new ModelAPI(req.params.model);
    const hookAPI = res.locals.hookAPI;
    const dataSets = await modelAPI.Model.findAll({
        where: {},
        raw: true
    })
    viewAPI.addScript(res, {
        type: 'text',
        content: `
        const ORIGINAL_URL = '${req.originalUrl}'
        `
    })
    viewAPI.addScript(res, {
        type: 'link',
        content: pathAPI.static().getFileUrl('js/admin/model.controller.js')
    })
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: function () {
            return req.params.model
        }
    })
    hookAPI.add_action('MODEL_SINGLE_ADD_FORM', {
        callback: async function (oldData) {
            oldData = oldData || '';
            const keys = modelAPI.getInputFields();
            const html = await modelAPI.getFormTemplate(keys, themeAPI.getAdminTemplatePath('model/add_form.ejs'), hookAPI)
            return oldData + html;
        }
    })
    await res.renderStream('admin/template/header.ejs');
    await res.renderStream('admin/model.single.ejs', {
        dataFields: {
            name: req.params.model,
            datasets: dataSets
        }
    })
    await res.renderStream('admin/template/footer.ejs');
    res.end()
})
/**
 * add Record
 */
route.post('/:model/', async function (req, res) {
    const hookAPI = res.locals.hookAPI;

    const modelAPI = new ModelAPI(req.params.model);
    let body = await hookAPI.do_filter('MODEL_BEFORE_SAVE_DATA', req.body, {
        modelAPI
    })
    const record = new modelAPI.Model(body);
    record
        .save()
        .then(result => {
            res.redirect(req.originalUrl);
            return
        })
        .catch(err => {
            console.log(err);
            res.error(err)
        })
})
route.delete('/:model/', async function (req, res) {
    const modelAPI = new ModelAPI(req.params.model);
    const record = new modelAPI.Model(req.query);
    record
        .destroy()
        .then(result => {
            res.success(result)
        })
        .catch(err => {
            res.error(err)
        })
})