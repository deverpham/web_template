const {
    RouterAPI,
    CookieAPI,
    ModelAPI,
    viewAPI
} = require('../../../api')
const postTypeRoute = new RouterAPI();
postTypeRoute.get('/:post', async (req, res) => {
    const hookAPI = res.locals.hookAPI;
    hookAPI.add_filter('ADMIN_PAGE_TITLE', {
        callback: async function () {
            return 'Dashboard | Post Type | ' + req.params.post
        }
    })
    await res.renderStream('admin/template/header.ejs')
    await res.renderStream('admin/post_type.single.ejs');
    await res.renderStream('admin/template/footer.ejs');
    res.end()
})
module.exports = postTypeRoute