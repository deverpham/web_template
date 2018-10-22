const { app } = require('../../express');
const { getThemeDir } = require('../theme');
class TemplateAPI {
    constructor() {
        this.templates = []
    }
    /**
     * 
     * @param {string} name name template
     * @param {string} html a string of html
     */
    addTemplate(name, html) {
        this.templates[name] = html
    }
    loadTemplate(name) {
        return this.templates[name]
    }
}
module.exports = new TemplateAPI()