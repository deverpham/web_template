
const ejs = require('ejs');

const path = require('path');
const {
    store
} = require('../share')

const {
    theme,
    view
} = require('../controllers')
const {
    reactEngine
} = require('../providers')
reactEngine.load({
    only: store.config().get().theme.path
});
module.exports = function (req, res, next) {
    res.stream = {

        ejs: function (filePath, payload = {}) {
            return new Promise(resolve => {
                const themeDir = theme.dir();
                const fileRealPath = path.join(themeDir, filePath)
                ejs.renderFile(fileRealPath, {
                    ...payload,
                    ...res.locals
                }, {
                        async: true
                    })
                    .then(html => {
                        res.write(html)
                        resolve();
                    })
            })
        },

        react: function (filePath, payload = {}) {
            const themeDir = theme.dir();
            const fileRealPath = path.join(themeDir, filePath)
            return new Promise(async resolve => {
                const [html, script] = await reactEngine.render(fileRealPath, {
                    ...payload,
                    ...res.locals
                })
                view.script().add(res, {
                    type: 'text',
                    content: script
                }, true);
                res.write(html)

                resolve()
            })
        }
    }
    res.success = function (payload) {
        return res.json({
            status: 'success',
            payload
        })
    }
    res.error = function (error, status = 400) {
        return res.status(status).json({
            status: 'error',
            error: error.toString()
        })
    }
    next();
}