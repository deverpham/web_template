const {
    themeAPI,
    loggerAPI
} = require('../../api')
const ejs = require('ejs');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
module.exports = function (req, res, next) {
    const helpers = glob.sync(themeAPI.getThemeHelperDir() + '/*.ejs');
    helpers.map(helper => {
        const name = path.basename(helper).replace('.ejs', '');
        const content = fs.readFileSync(helper).toString()
        res.locals[name] = function (data) {
            const dataMapLocals = Object.assign(res.locals, data)
            return ejs.compile(content, {
                async: true
            })(dataMapLocals)
        }

    })
    next();
}