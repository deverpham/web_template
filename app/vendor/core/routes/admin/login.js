const {
    Router,
    Model
} = require('../../providers')
const [route] = [new Router.Route(HANDLER)]
const render = require('../render/admin.render')
const {
    theme,
    view
} = require('../../controllers')
route.get('/',
    render
    .clone()
    .before(async function (req, res) {
        /*
        view.script().add(res, {
            type: 'text',
            content: `
                alert('${req.baseUrl}')
            `
        })
        */
    })
    .set(async (req, res) => {
        res.stream.ejs('admin/login.ejs')
    }));
module.exports = route