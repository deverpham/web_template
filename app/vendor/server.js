const API = require('./core/api')
const providers = require('./providers');
class App {
    /**
     * 
     * @param {siteOpts} config 
     */
    constructor(config) {
        API.store.config().set(config);
    }
    boot() {
        return this.controller().bootApp()
    }
    provider() {
        return { ...
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