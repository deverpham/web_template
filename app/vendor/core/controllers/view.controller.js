class View {
    load() {
        const template = require('./view/template.s-ctrl');
        this.template = template;
    }
}
const view = new View();
module.exports = view;