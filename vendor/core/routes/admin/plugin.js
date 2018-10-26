const {
    RouterAPI,
    pluginAPI
} = require('../../../api')
const pluginRoute = new RouterAPI()
const joi = require('joi')
pluginRoute.configValidate({
    '/*/': {
        'GET': {
            headers: {
                action: joi.string().required()
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