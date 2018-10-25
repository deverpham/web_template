const {
    RouterAPI,
    pluginAPI
} = require('../../../api')
const pluginRoute = new RouterAPI()
pluginRoute.get('/', async function (req, res) {
    const plugins = await pluginAPI.getAll();
    res.setHeader('Content-Type', 'text/html')
    await res.renderStream('admin/plugin.ejs')
    res.end()
})
pluginRoute.listen();
module.exports = pluginRoute