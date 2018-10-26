const {
    RouterAPI,
    CookieAPI,
    ModelAPI,
    viewAPI
} = require('../../../api');
const attrManagerRoute = new RouterAPI();
attrManagerRoute.get('/', async (req, res) => {
    const PostTypeModel = new ModelAPI('post_type');
    const posts = await PostTypeModel.Model.findAll({
        where: {},
        raw: true
    })
    console.log(posts);
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            return 'Dashboard | Attribute Manager'
        }
    })
    await res.renderStream('admin/template/header.ejs')
    await res.renderStream('admin/attrmanager.ejs', { posts })
    await res.renderStream('admin/template/footer.ejs')
    res.end()
})
attrManagerRoute.get('/:postname', async (req, res) => {
    const postName = req.params.postname;
    res.end(postName);
})
module.exports = attrManagerRoute