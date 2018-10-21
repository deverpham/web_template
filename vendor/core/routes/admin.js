const { RouterAPI } = require('../../api')
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
    await res.renderStream('admin/template/header.html')
    await res.renderStream('admin/home.html')
    await res.renderStream('admin/template/footer.html')
    res.end()
})