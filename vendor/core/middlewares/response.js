const ejs = require('ejs');
const path = require('path');
const { app } = require('../../express')

module.exports = function (req, res, next) {
    res.renderStream = function (filePath) {
        return new Promise(resolve => {
            const viewPath = app.get('views');
            const fileRealPath = path.join(viewPath, filePath)
            ejs.renderFile(fileRealPath, res.locals, {
                async: true
            })
                .then(html => {
                    res.write(html)
                    resolve();
                })
        })
    }
    next();
}