const ejs = require('ejs');

const path = require('path');
const {
    app
} = require('../../express')

module.exports = function (req, res, next) {
    res.renderStream = function (filePath, payload = {}) {
        return new Promise(resolve => {
            const viewPath = app.get('views');
            const fileRealPath = path.join(viewPath, filePath)
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