/* eslint no-undef:1 */
const path = require('path');
const {
    EventEmitter
} = require('events');
const {
    store
} = require('../api')
class Theme {
    constructor() {
        this.controller = new EventEmitter();
        this.controller.on('change', this.changeTheme);
    }
    setTheme(dir) {
        console.success('theme: ', dir)
        this.controller.emit('change', dir)
    }
    changeTheme(dir) {
        HANDLER.ctrl.set('views', dir)
    }
    dir() {
        return HANDLER.ctrl.get('views')
    }
    admin() {
        return {
            templateDir: () => {
                const dir = this.dir();
                return path.join(dir, './admin/template');
            },
            templatePath: (file) => {
                const dir = this.admin().templateDir();
                return path.join(dir, file);
            }
        }
    }
    helper() {
        return {
            dir: () => {
                return path.join(this.dir(), './helpers')
            }
        }
    }
    load() {
        const {
            theme
        } = store.config().get();
        this.setTheme(theme.path + '/' + theme.default);
    }
}
const theme = new Theme();
module.exports = theme;