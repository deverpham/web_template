const Share = require('./core/share')
const providers = require('./providers');
class App {
    /**
     * 
     * @param {siteOpts} config 
     */
    constructor(config) {
        Share.store.config().set(config);
    }
    boot() {
        return this.controller().bootApp()
    }
    provider() {
        return {
            ...
            providers
        };
    }
    controller() {

        const controllers = require('./core/controllers');
        return {
            ...controllers
        }
    }
}
module.exports = {
    App
};