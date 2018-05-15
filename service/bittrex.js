const bittrex = require('node-bittrex-api');
const getConfig = require('../middleware/getconfig');
const getTopHighVolumeMarket = require('./bittrexModule/get_top_market').getTopHighVolumeMarket;
class BittrexMiddleware {
    async getAuth() {
        var config = await getConfig();
        bittrex.options({
            'apiKey': config.key,
            'apisecret': config.secret
        })
        return bittrex;
    }
    async listen() {
       
    }
    async getTopMarket(marketCurrency) {
        var auth = await this.getAuth();
        var markets = await getTopHighVolumeMarket(auth, marketCurrency,10);
        return markets;
    }
}
var bittrexModule = new BittrexMiddleware();
module.exports =bittrexModule;