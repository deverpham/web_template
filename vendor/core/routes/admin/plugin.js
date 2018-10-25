const {
    RouterChild,
    pluginAPI
} = require('../../../api')
const pluginRoute = new RouterChild()
pluginRoute.get('/', async function (req, res) {
    const plugins = await pluginAPI.getAll();
    console.log(plugins)
    res.setHeader('Content-Type', 'text/html')
    await res.renderStream('admin/plugin.ejs')
    res.end()
})
pluginRoute.listen();
module.exports = pluginRoute