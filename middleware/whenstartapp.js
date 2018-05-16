const btcPrice = require('../service/btc_update_price');
const bot = require('../service/bot');
module.exports  = (function() {
    return {
        init : function() {
            btcPrice.listen();
            console.log('server start')
            bot.listen();
            bot.ProtectWallet();
        }
    }
}())