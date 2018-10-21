const { app } = require('../express')
const { EventEmitter } = require('events');
class ThemeAPI {
    constructor(name, dir) {
        this.controller = new EventEmitter();
        this.controller.on('change', this.changeTheme)
        this.name = name;
        this.dir = dir;
    }
    /**
     * Set Theme folder for app
     * @param {string} dir Path 
     */
    changeTheme(dir) {
        app.set('views', dir)
    }
    getThemeDir() {
        return app.get('views')
    }
    setTheme(dir) {
        this.controller.emit('change', dir)
    }
}
module.exports = new ThemeAPI()