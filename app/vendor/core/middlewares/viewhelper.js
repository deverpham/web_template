const controller = require('../controllers')
const ejs = require('ejs');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
module.exports = function (req, res, next) {
    const helpers = glob.sync(controller.theme.helper().dir() + '/*.ejs');
    helpers.map(helper => {
        const name = path.basename(helper).replace('.ejs', '');
        const content = fs.readFileSync(helper).toString()
        res.locals[name] = function (data) {
            const dataMapLocals = Object.assign(res.locals, data)
            return ejs.compile(content)(dataMapLocals)
        }
        controller.view.template.add(name, res.locals[name])
    })
    next();
}