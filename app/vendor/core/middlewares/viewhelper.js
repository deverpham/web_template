const controller = require('../controllers')
const ejs = require('ejs');
const glob = require('glob');
const fs = require('fs');
const path = require('path');
const {
    reactEngine
} = require('../../providers')

function ejsRender(req, res, next) {
    const helpers = glob.sync(controller.theme.helper().dir() + '/*.ejs');
    helpers.map(helper => {
        const name = path.basename(helper).replace('.ejs', '');
        const content = fs.readFileSync(helper).toString()
        res.locals[name] = function (data) {
            const dataMapLocals = Object.assign(res.locals, data, {
                ejs
            })
            return ejs.compile(content)(dataMapLocals)
        }
        controller.view.template.add(name, res.locals[name])
    })
    next();
}

function react(req, res, next) {
    const helpers = glob.sync(controller.theme.helper().dir() + '/*.jsx');
    helpers.map(async helper => {
        const name = path.basename(helper).replace('.jsx', '');
        res.locals[name] = async function (data) {
            const dataMapLocals = Object.assign(res.locals, data, {
                ejs
            })
            return await reactEngine.render(helper, dataMapLocals)
        }
    })
    next();
}
module.exports = react