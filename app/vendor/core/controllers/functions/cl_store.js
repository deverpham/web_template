/**
 * Collect store
 */
const {
    store
} = require('../../api');
const {
    DB
} = require('../../database/sequelize');

function cl_store() {
    console.info('sharing memory by collect stores')
    store.storage().set('DB', DB);

}
module.exports = cl_store