
async function load() {
    loadRoutes();
}
function loadRoutes() {
    require('./routes')
}
module.exports = { load }