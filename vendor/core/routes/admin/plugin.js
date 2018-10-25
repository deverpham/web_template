const {
    RouterChild,
    pluginAPI
} = require('../../../api')
const pluginRoute = new RouterChild()
pluginRoute.configValidate({
    "/": {
        "GET": {
            query: {
                action: pluginRoute.joi.string().required()
            }
        }
    }
})
pluginRoute.get('/', async function (req, res) {

    const plugins = await pluginAPI.getAll();
    res.setHeader('Content-Type', 'text/html')
    await res.renderStream('admin/plugin.ejs', {
        plugins
    })
    res.end()
})
pluginRoute.get('/*/', async function (req, res) {
    res.end();
})
module.exports = pluginRoute