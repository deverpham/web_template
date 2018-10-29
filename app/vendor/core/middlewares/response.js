const ejs = require('ejs');
const path = require('path');
const {
    theme
} = require('../controllers');
module.exports = function (req, res, next) {
    res.renderStream = function (filePath, payload = {}) {
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