const bittrex = require('../service/bittrex');
const runner = require('../service/runner');
const btcPrice = require('../service/btc_update_price');
module.exports  = (function() {
    return {
        init : function() {
            btcPrice.listen();
            console.log('server start')
            bittrex.listen();
        }
    }
}())