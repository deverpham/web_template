const cl_store = require('./cl_store');
const theme = require('../theme.controller')
const middleware = require('../middleware.controller')
const plugin = require('../plugin.controller')
const resource = require('../resources.controller')
const view = require('../view.controller')
const {
    store
} = require('../../api')
const {
    WebHandler
} = require('../../providers')

async function bootApp() {
    console.info('booting your app...')
    cl_store();
    console.info("loading database")
    await loadDB()
    console.success('completed:db');
    createHandler();
    console.success('registered:hanlder')
    theme.load();
    middleware.load();
    resource.load();
    plugin.load();
    view.load();
    await HANDLER.listen(); // eslint-disable-line no-undef
}

/**
 * @return {Promise}
 */
function loadDB() {
    return DB.sync({ // eslint-disable-line no-undef
        force: true
    })
}

async function createHandler() {
    const config = store.config().get().server;
    const web = new WebHandler(config);
    store.storage().set('HANDLER', web); /* add handler to global object */
}
module.exports = bootApp;