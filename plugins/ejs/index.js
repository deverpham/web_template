
module.exports = (function () {
    return {
        init: function (req, res) {
            const hookAPI = res.locals.hookAPI;
            hookAPI.add_action('RENDER_TITLE_ADMIN', {
                id: 'render_admin_s',
                callback: function () {
                    res.write('gg')
                }
            })
            res.locals.baseUrl = fullUrl = 'http' + '://' + req.get('host')
            res.locals.url = req.originalUrl
            this.done();
        }
    }
}())