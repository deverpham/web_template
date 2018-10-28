const {
    store
} = require('../../api')
const {
    loadDatabase
} = require('../../database');

function bootApp() {
    console.info('booting your app...')
    loadDatabase()
}
module.exports = bootApp;