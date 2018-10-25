const {
    RouterChild,
    CookieAPI,
    viewAPI
} = require('../../../api')
const homeRoute = new RouterChild('/');
homeRoute.get('/', async (req, res) => {
    const cookieAPI = new CookieAPI(req); //parse Cookie
    const user = cookieAPI.get('user'); //Check if Login
    if (!user) return res.redirect('/admin/login')
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            return 'Dashboard | ' + user.username
        }
    })
    const adminView = viewAPI.admin;

    adminView.addMenuItem(hookAPI, {
        link: '/admin/user',
        name: 'User'
    })
    adminView.addMenuItem(hookAPI, {
        link: '/admin/plugin',
        name: 'Plugin'
    })

    await res.renderStream('admin/template/header.ejs')
    await res.renderStream('admin/home.ejs')
    await res.renderStream('admin/template/footer.ejs')
    res.end()
})
homeRoute.listen()
module.exports = homeRoute;