const {
    store
} = require('../api')
const express = require('express');
class Resources {
    load() {
        const {
            path,
            route
        } = store.config().get().view.static;
        HANDLER.ctrl.use(route, express.static(path)); /* eslint-disable-line no-undef */
        console.success('resource->load:path', path);
    }
}
const resources = new Resources();
module.exports = resources;