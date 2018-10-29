const cl_store = require("./cl_store");
const theme = require("../theme.controller");
const middleware = require("../middleware.controller");
const plugin = require("../plugin.controller");
const resource = require("../resources.controller");
const view = require("../view.controller");
const routes = require("../routes.controller");
const {
    store
} = require("../../api");
const {
    WebHandler
} = require("../../providers");

async function bootApp() {
    console.info("booting your app...");
    cl_store();
    console.info("loading database");
    await loadDB();
    console.info("db:completed");
    createHandler();
    console.info("hanlder:registered");
    middleware.load();
    resource.load();
    plugin.load();
    view.load();
    theme.load();
    routes.load();
    errorHanding();
    await HANDLER.listen(); // eslint-disable-line no-undef
}

function loadDB() {
    require("../../database/model");
}

function errorHanding() {
    HANDLER.ctrl.use(function (req, res, next) { // eslint-disable-line no-undef
        throw (new Error('sorry! i didnt found your request'))
    })
    HANDLER.ctrl.use(function (err, req, res, next) { // eslint-disable-line no-undef
        res.error(err);
    });
}
async function createHandler() {
    const config = store.config().get().server;
    const web = new WebHandler(config);
    store.storage().set("HANDLER", web); /* add handler to global object */
}
module.exports = bootApp;