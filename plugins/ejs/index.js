
const { hookAPI } = require('../../vendor')
module.exports = (function () {
    return {
        init: function (req, res) {
            hookAPI.add_action('RENDER', {
                id: 'render_admin',
                callback: function () {
                    res.renderStream('gg');
                }
            })
            res.locals.baseUrl = fullUrl = 'http' + '://' + req.get('host')
            res.locals.url = req.originalUrl
            this.done();
        }
    }
}())