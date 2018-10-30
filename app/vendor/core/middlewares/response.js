const ejs = require('ejs');
const path = require('path');

const jsxRender = require('express-react-views').createEngine()
const {
    theme
} = require('../controllers')
module.exports = function (req, res, next) {
    res.renderStream = {
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
            return new Promise(resolve => {
                jsxRender(fileRealPath, {
                    ...HANDLER.ctrl,
                    ...payload,
                    ...res.locals
                }, function (err, html) {
                    if (err) throw (err);
                    res.write(html);
                })
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