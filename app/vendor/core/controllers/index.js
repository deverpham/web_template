const functions = require('./functions')
const middleware = require('./middleware.controller')
const plugin = require('./plugin.controller')
const resources = require('./resources.controller');
const theme = require('./theme.controller');
const view = require('./view.controller');
module.exports = {
    ...functions,
    middleware,
    plugin,
    resources,
    theme,
    view
}