
var handingError = require('./handingError');
module.exports = function() {
    return new Promise(resolve => {
        $.get('/api/market/btchighvolume', function(data) {
            resolve(data)
        })
        .fail(message => handingError(message))
    })
}