const { hookAPI, RouterAPI } = require('../../api')
const route = new RouterAPI('admin');
route.get('/', async (req, res) => {
    await res.renderStream('admin/template/header.html')
    await res.renderStream('admin/home.html')
    await res.renderStream('admin/template/footer.html')
    res.end()
})