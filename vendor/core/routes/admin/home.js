const {
    RouterAPI,
    CookieAPI,
    ModelAPI,
    viewAPI
} = require('../../../api')
const homeRoute = new RouterAPI();
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
    const table = await ModelAPI.getTables();
    function loadTableData() {
        return new Promise(resolve => {
            Promise.all(table.map(async table => {
                const tableName = table.Model.name;
                if (tableName == 'post_type' || tableName == 'attribute_type') {
                    const result = await table
                        .Model.findAll({
                            where: {},
                            raw: true
                        })

                    console.log(result)
                    result.map(record =>
                        adminView.addMenuItem(hookAPI, {
                            link: `/admin/${tableName}/${record.slug}`,
                            name: record.name
                        }))

                }
                return adminView.addMenuItem(hookAPI, {
                    link: `/admin/${tableName}`,
                    name: tableName.replace(/\_/g, ' ')
                })
            })).then(() => {
                resolve()
            })
        })
    }
    await loadTableData()
    adminView.addMenuItem(hookAPI, {
        link: '/admin/plugin',
        name: 'Plugin'
    })
    adminView.addMenuItem(hookAPI, {
        link: '/admin/attribute-manager',
        name: 'Attribute Manager'
    })

    await res.renderStream('admin/template/header.ejs')
    await res.renderStream('admin/home.ejs')
    await res.renderStream('admin/template/footer.ejs')
    res.end()
})
module.exports = homeRoute;